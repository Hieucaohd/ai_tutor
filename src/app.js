/* Progressive enhancement only. No API, analytics, cookies or persistence. */
(() => {
  'use strict';
  const root = document.body;
  const header = document.querySelector('.ml-header');
  const button = document.querySelector('.ml-menu');
  const navigation = document.querySelector('#ml-navigation');
  if (!root || !header || !button || !navigation) return;
  const label = button.querySelector('.ml-menu-label');
  const desktop = window.matchMedia('(min-width:1024px)');
  // CSS can blur a link before the media-query change event reaches JS.
  // Remember its focus until another visible control receives focus.
  let navigationHadFocus = false;
  document.addEventListener('focusin', (event) => {
    navigationHadFocus = navigation.contains(event.target);
  });
  function setOpen(open) {
    const expanded = Boolean(open && !desktop.matches);
    button.setAttribute('aria-expanded', String(expanded));
    navigation.classList.toggle('is-open', expanded);
    if (label) label.textContent = expanded ? button.dataset.closeLabel : button.dataset.openLabel;
  }
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  header.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      setOpen(false);
      // Keep native navigation, URL hash and browser history; move keyboard focus.
      target.focus({preventScroll:true});
    });
  });
  function onBreakpointChange() {
    const focusWillHide = !desktop.matches && (
      navigation.contains(document.activeElement) ||
      (navigationHadFocus && document.activeElement === root)
    );
    setOpen(false);
    if (focusWillHide) button.focus();
  }
  if (desktop.addEventListener) desktop.addEventListener('change', onBreakpointChange);
  else desktop.addListener(onBreakpointChange);
  button.hidden = false;
  root.classList.add('has-js');
  setOpen(false);
})();
