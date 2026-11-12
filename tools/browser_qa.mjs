// QA only: connects to the user-designated local Chrome port, creates and closes
// an isolated browser context. Never accesses existing tabs or signed-in sessions.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'http://127.0.0.1:4173';
const output = path.join(root, 'qa');
const shots = path.join(output, 'screenshots');
await fs.mkdir(shots, { recursive: true });
const checks = [];
const errors = [];
const requests = [];
const responses = [];
const layouts = [];
const debug = process.argv.includes('--debug');
let contextId;
let session;
let sequence = 0;
const pending = new Map();
const version = await (await fetch('http://127.0.0.1:9222/json/version')).json();
const socket = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true });
  socket.addEventListener('error', reject, { once: true });
});
socket.addEventListener('message', ({ data }) => {
  const message = JSON.parse(data);
  if (message.id) {
    const task = pending.get(message.id);
    if (!task) return;
    pending.delete(message.id);
    clearTimeout(task.timeout);
    if (message.error) task.reject(new Error(JSON.stringify(message.error)));
    else task.resolve(message.result);
  } else if (message.sessionId === session) {
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(message.params.args.map(a => a.value || a.description).join(' '));
    if (message.method === 'Network.requestWillBeSent') requests.push(message.params.request.url);
    if (message.method === 'Network.responseReceived') responses.push({ url: message.params.response.url, status: message.params.response.status });
    if (message.method === 'Network.loadingFailed') errors.push(message.params.errorText);
  }
});

function call(method, params = {}, target = session) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timeout = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 15000);
    pending.set(id, { resolve, reject, timeout });
    socket.send(JSON.stringify({ id, method, params, ...(target ? { sessionId: target } : {}) }));
  });
}
async function evaluate(expression) {
  const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  return result.result.value;
}
async function settle() {
  await new Promise(resolve => setTimeout(resolve, 60));
}
function check(passed, name, detail) {
  checks.push({ name, passed: Boolean(passed), ...(detail === undefined ? {} : { detail }) });
  if (!passed) console.error('FAIL:', name, detail ?? '');
}
async function viewport(width, height = 900) {
  await call('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await settle();
}
async function navigate(url = origin) {
  await call('Page.navigate', { url });
  for (let i = 0; i < 100; i++) {
    const ready = await evaluate('document.readyState === "complete" && !!document.querySelector(".ml-footer")');
    if (ready) { await settle(); return; }
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  throw new Error('Page did not load');
}
const keys = {
  Tab: ['Tab', 'Tab', 9], Enter: ['Enter', 'Enter', 13], Space: [' ', 'Space', 32], Escape: ['Escape', 'Escape', 27],
};
async function key(name, modifiers = 0) {
  const [value, code, vk] = keys[name];
  if (debug) console.log('before',name,await evaluate('({active:document.activeElement.outerHTML.slice(0,300),js:document.body.className,hash:location.hash})'));
  await call('Input.dispatchKeyEvent', { type: name === 'Enter' ? 'keyDown' : 'rawKeyDown', key: value, code, windowsVirtualKeyCode: vk, modifiers, ...(name === 'Enter' ? {text:'\r',unmodifiedText:'\r'} : {}) });
  await call('Input.dispatchKeyEvent', { type: 'keyUp', key: value, code, windowsVirtualKeyCode: vk, modifiers });
  await settle();
  if (debug) console.log('after',name,await evaluate('({active:document.activeElement.outerHTML.slice(0,300),open:document.querySelector("details").open,expanded:document.querySelector(".ml-menu").getAttribute("aria-expanded"),hash:location.hash})'));
}
async function focus(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).focus()`);
}
async function click(selector) {
  await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center',behavior:'instant'})`);
  const point = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
  await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  await settle();
}
async function screenshot(name, full = true) {
  const metrics = await call('Page.getLayoutMetrics');
  const size = metrics.cssContentSize;
  const result = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, ...(full ? { clip: { x: 0, y: 0, width: size.width, height: size.height, scale: 1 } } : {}) });
  await fs.writeFile(path.join(shots, `${name}.png`), Buffer.from(result.data, 'base64'));
}

try {
  ({ browserContextId: contextId } = await call('Target.createBrowserContext', {}, null));
  const { targetId } = await call('Target.createTarget', { url: 'about:blank', browserContextId: contextId }, null);
  ({ sessionId: session } = await call('Target.attachToTarget', { targetId, flatten: true }, null));
  await call('Page.enable');
  await call('Runtime.enable');
  await call('Network.enable');
  await call('DOM.enable');
  await call('CSS.enable');
  await call('Page.bringToFront');
  await call('Emulation.setFocusEmulationEnabled', {enabled:true});
  await viewport(1440, 1000);
  await navigate();
  check(await evaluate('document.body.classList.contains("has-js")'), 'TE-02: application JS executes');
  const copy = JSON.parse(await fs.readFile(path.join(root, 'content/copy.vi.json'), 'utf8')).strings;
  const renderedCopy = await evaluate(`(() => { const items = [...document.querySelectorAll('[data-copy]')].map(e => [e.dataset.copy,e.textContent.trim()]); for (const e of document.querySelectorAll('[data-copy-attr]')) {const [attr,key] = e.dataset.copyAttr.split(':');items.push([key,e.getAttribute(attr)]);} const b = document.querySelector('.ml-menu');items.push(['menu.open',b.dataset.openLabel],['menu.close',b.dataset.closeLabel]);return items;})()`);
  check(new Set(renderedCopy.map(([k]) => k)).size === 78 && renderedCopy.every(([k,v]) => copy[k] === v), 'CP-01: live DOM matches all 78 JSON strings');

  for (const width of (debug ? [1440,390] : [1440, 1024, 1023, 768, 767, 480, 479, 390, 320, 1920])) {
    await viewport(width, width === 1440 ? 1000 : 900);
    await evaluate('document.querySelector("details").open = false;window.scrollTo({top:0,behavior:"instant"})');
    const layout = await evaluate(`(() => {
      const columns = s => getComputedStyle(document.querySelector(s)).gridTemplateColumns.split(' ').length;
      const r = document.querySelector('.ml-container').getBoundingClientRect();
      const overflow = [...document.querySelectorAll('body *')].filter(e => {const s=getComputedStyle(e),r=e.getBoundingClientRect();return s.display!=='none' && s.position!=='absolute' && r.width>0 && (r.left<-.5 || r.right>innerWidth+.5)}).map(e=>e.className || e.tagName);
      return {width:innerWidth,clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,container:r.width,hero:columns('.ml-hero-grid'),principles:columns('.ml-features'),steps:columns('.ml-step-grid'),coach:columns('.ml-coach-grid'),menu:getComputedStyle(document.querySelector('.ml-menu')).display,overflow};
    })()`);
    layouts.push(layout);
    const expected = [width >= 1024 ? 2 : 1, width >= 768 ? 3 : 1, width >= 1024 ? 4 : width >= 480 ? 2 : 1, width >= 768 ? 2 : 1];
    check(layout.scrollWidth <= layout.clientWidth && !layout.overflow.length, `UI-05: no overflow at ${width}px`, layout.overflow);
    check([layout.hero,layout.principles,layout.steps,layout.coach].every((v,i)=>v===expected[i]), `UI-02/03/04: grid layout at ${width}px`);
    check(Math.abs(layout.container - Math.min(layout.clientWidth - (width >= 768 ? 64 : 40), 1160)) < 1, `UI: exact container at ${width}px`);
    if (width < 480) check(await evaluate('[...document.querySelectorAll(".ml-cta .ml-button")].every(e => Math.abs(e.getBoundingClientRect().width-document.querySelector(".ml-cta").getBoundingClientRect().width)<1)'), `UI-03: full width CTA at ${width}px`);
    await focus('summary');
    await key('Enter');
    check(await evaluate('document.querySelector("details").open && document.documentElement.scrollWidth <= document.documentElement.clientWidth'), `IN-06: native details and reflow at ${width}px`);
    await screenshot(`width-${width}`);
    await key('Space');
    check(await evaluate('!document.querySelector("details").open'), `IN-06: Space closes details at ${width}px`);
  }
  console.log('Responsive matrix complete.');

  await viewport(390, 844);
  await navigate();
  check(await evaluate('document.querySelector(".ml-menu").getAttribute("aria-expanded")==="false" && getComputedStyle(document.querySelector("nav")).display==="none"'), 'IN-03: menu initially closed');
  await focus('.ml-menu');
  await key('Enter');
  check(await evaluate('document.querySelector(".ml-menu").getAttribute("aria-expanded")==="true" && document.querySelector(".ml-menu-label").textContent === document.querySelector(".ml-menu").dataset.closeLabel && document.querySelector(".ml-menu").getAttribute("aria-controls")===document.querySelector("nav").id'), 'IN-03: Enter opens menu and synchronizes ARIA/name');
  await key('Tab');
  check(await evaluate('document.activeElement.matches("nav a:first-child")'), 'AX-02: Tab enters first navigation link');
  await key('Tab', 8);
  check(await evaluate('document.activeElement.matches(".ml-menu")'), 'AX-02: Shift+Tab returns to menu');
  await key('Escape');
  check(await evaluate('document.activeElement.matches(".ml-menu") && document.querySelector(".ml-menu").getAttribute("aria-expanded")==="false"'), 'IN-04: Escape closes and restores focus');
  await key('Space');
  await key('Tab');
  await key('Tab');
  await key('Enter');
  check(await evaluate('location.hash==="#ml-coach" && document.activeElement.id==="ml-coach" && document.querySelector(".ml-menu").getAttribute("aria-expanded")==="false"'), 'IN-01/04: mobile Coach anchor closes menu and focuses target');
  await click('.ml-coach-grid .ml-button');
  check(await evaluate('location.hash==="#ml-steps" && document.activeElement.id==="ml-steps"'), 'IN-01: Coach CTA returns to steps');
  await click('.ml-hero .ml-secondary');
  check(await evaluate('location.hash==="#ml-coach" && document.activeElement.id==="ml-coach"'), 'IN-01: hero secondary CTA');
  await click('.ml-hero .ml-primary');
  check(await evaluate('location.hash==="#ml-steps" && document.activeElement.id==="ml-steps"'), 'IN-01: hero primary CTA');
  await evaluate('history.back()');
  await settle();
  check(await evaluate('location.hash==="#ml-coach"'), 'IN-08: native browser Back restores hash');
  await evaluate('history.forward()');
  await settle();
  check(await evaluate('location.hash==="#ml-steps"'), 'IN-08: native browser Forward restores hash');
  await focus('.ml-brand');
  await key('Enter');
  check(await evaluate('location.hash==="#ml-top" && document.activeElement.id==="ml-top"'), 'IN-02: logo returns to page start');
  await navigate();
  await focus('body');
  await key('Tab');
  const focusStyle = await evaluate('({outline:getComputedStyle(document.activeElement).outlineWidth,style:getComputedStyle(document.activeElement).outlineStyle,top:document.activeElement.getBoundingClientRect().top})');
  check(focusStyle.outline==='3px' && focusStyle.style==='solid' && focusStyle.top >= 0, 'AX-03: skip link and focus indicator visible', focusStyle);
  await key('Enter');
  check(await evaluate('document.activeElement.id==="ml-main" && location.hash==="#ml-main"'), 'IN-02: skip link focuses main');

  await viewport(1023);
  await focus('.ml-menu');
  await key('Enter');
  await key('Tab');
  await viewport(1024);
  check(await evaluate('getComputedStyle(document.querySelector("nav")).display==="flex" && document.querySelector(".ml-menu").getAttribute("aria-expanded")==="false"'), 'IN-05: desktop resize resets menu');
  await viewport(1023);
  check(await evaluate('document.activeElement.matches(".ml-menu") && getComputedStyle(document.querySelector("nav")).display==="none"'), 'IN-05: mobile resize moves focus out of hidden nav');
  await viewport(1440);
  await focus('.ml-brand');
  const tabOrder = [];
  for (let i=0;i<7;i++) { await key('Tab'); tabOrder.push(await evaluate('document.activeElement.getAttribute("href") || document.activeElement.tagName')); }
  check(JSON.stringify(tabOrder)===JSON.stringify(['#ml-top','#ml-coach','#ml-steps','#ml-steps','#ml-coach','#ml-steps','SUMMARY']), 'AX-02: full desktop keyboard order excludes static cards', tabOrder);
  const targets = await evaluate('[...document.querySelectorAll("a,button,summary")].filter(e=>e.getClientRects().length).map(e=>({name:e.textContent.trim(),width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))');
  check(targets.every(t=>t.width>=44 && t.height>=44), 'AX-03: visible controls meet 44px target', targets);

  await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  // A new document avoids inheriting a smooth scroll already in flight from
  // the preceding keyboard checks before the media preference changed.
  await navigate();
  check(await evaluate('matchMedia("(prefers-reduced-motion:reduce)").matches && getComputedStyle(document.documentElement).scrollBehavior==="auto"'), 'AX-06: reduced motion disables smooth scrolling');
  await click('.ml-hero .ml-primary');
  const reducedScroll = await evaluate('({top:document.querySelector("#ml-steps").getBoundingClientRect().top,hash:location.hash,behavior:getComputedStyle(document.documentElement).scrollBehavior})');
  check(Math.abs(reducedScroll.top)<2 && reducedScroll.hash==='#ml-steps', 'AX-06: reduced motion anchor scroll completes immediately', reducedScroll);
  await call('Emulation.setEmulatedMedia', { features: [{ name: 'forced-colors', value: 'active' }] });
  check(await evaluate('matchMedia("(forced-colors:active)").matches && getComputedStyle(document.querySelector(".ml-primary")).borderTopStyle==="solid"'), 'AX-08: forced-colors emulation retains control border');
  await screenshot('forced-colors');
  await call('Emulation.setEmulatedMedia', { features: [] });

  for (const width of [1440, 390, 320]) {
    await viewport(width);
    const {frameTree} = await call('Page.getFrameTree');
    const {styleSheetId} = await call('CSS.createStyleSheet', {frameId:frameTree.frame.id});
    await call('CSS.setStyleSheetText', {styleSheetId,text:'.ml * {line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}.ml p {margin-bottom:2em!important}'});
    check(await evaluate('document.documentElement.scrollWidth<=document.documentElement.clientWidth && [...document.querySelectorAll("p,h1,h2,h3,summary")].every(e=>e.scrollHeight <= e.clientHeight+1)'), `UI-06: text spacing at ${width}px`);
    await screenshot(`text-spacing-${width}`);
    await call('CSS.setStyleSheetText', {styleSheetId,text:''});
  }

  await call('Emulation.setScriptExecutionDisabled', { value: true });
  await viewport(320);
  await call('Page.reload', { ignoreCache: true });
  await new Promise(resolve=>setTimeout(resolve,200));
  check(await evaluate('!document.body.classList.contains("has-js") && getComputedStyle(document.querySelector("nav")).display==="flex" && getComputedStyle(document.querySelector(".ml-menu")).display==="none" && document.querySelectorAll("[data-copy]").length>70'), 'IN-07: no-JS navigation and content visible');
  await focus('summary');
  await key('Enter');
  check(await evaluate('document.querySelector("details").open'), 'IN-07: native details works without JS');
  await click('.ml-hero .ml-primary');
  check(await evaluate('location.hash==="#ml-steps"'), 'IN-07: anchor works without JS');
  await screenshot('no-js-320');
  await call('Emulation.setScriptExecutionDisabled', { value: false });
  await navigate();
  await call('Accessibility.enable');
  const tree = await call('Accessibility.getFullAXTree');
  const headings = tree.nodes.filter(n=>!n.ignored && n.role?.value==='heading').map(n=>({name:n.name?.value,level:n.properties?.find(p=>p.name==='level')?.value?.value}));
  check(headings.filter(h=>h.level===1).length===1 && headings.some(h=>h.name===copy['hero.title.first']+' '+copy['hero.title.second']), 'AX-01: accessibility heading hierarchy', headings);
  check(await evaluate('[...document.querySelectorAll("svg")].every(e=>e.closest("[aria-hidden=true]")) && !document.querySelector("[aria-live],[role=log],[role=status]")'), 'AX-05: decorative icons hidden; transcript not live');
  const storage = await evaluate('(async()=>({cookies:document.cookie,local:localStorage.length,session:sessionStorage.length,databases:await indexedDB.databases()}))()');
  check(!storage.cookies && !storage.local && !storage.session && !storage.databases.length, 'TE-03: no application cookies or storage', storage);
  const externalRequests = [...new Set(requests)].filter(url=>!url.startsWith(origin+'/'));
  check(!externalRequests.length, 'TE-03: no external network requests', externalRequests);
  check(!responses.some(r=>r.status>=400), 'TE-04: no resource HTTP errors');
  check(!errors.length, 'TE-04: no console/runtime/network errors', errors);
  console.log('Interaction, accessibility, fallback and network checks complete.');
} catch (error) {
  check(false, 'QA runner completed', error.stack);
} finally {
  if (contextId) await call('Target.disposeBrowserContext', { browserContextId: contextId }, null);
  socket.close();
  const report = { date: '2026-11-12', browser: version.Browser, platform: process.platform, testedOrigin: origin, testedOutput: 'dist/', passed: checks.every(c=>c.passed), count: checks.length, checks, layouts, resources: [...new Set(responses.map(r=>`${r.status} ${r.url}`))], limitations: ['Real browser zoom 200/400% requires separate UI check.', 'NVDA/VoiceOver and real OS high contrast not tested.', 'No student comprehension study.'] };
  await fs.writeFile(path.join(output, 'browser-results.json'), JSON.stringify(report,null,2)+'\n');
  console.log(`${report.passed?'PASS':'FAIL'}: ${checks.length} browser checks; report qa/browser-results.json`);
  process.exitCode = report.passed ? 0 : 1;
}
