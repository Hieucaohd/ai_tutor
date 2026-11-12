"""Validate the built site, never report the original prototype as the app."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import hashlib
import json
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'dist'
checks = []


def check(ok, name):
    checks.append({'name': name, 'passed': bool(ok)})


class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.elements, self.copies, self.stack, self.nesting_errors = [], [], [], []

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        self.elements.append((tag, attrs))
        if 'data-copy-attr' in attrs:
            attr, key = attrs['data-copy-attr'].split(':', 1)
            self.copies.append((key, attrs.get(attr, '')))
        if tag == 'button' and 'data-open-label' in attrs:
            self.copies.extend([('menu.open', attrs['data-open-label']), ('menu.close', attrs['data-close-label'])])
        if tag not in {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}:
            self.stack.append({'tag': tag, 'key': attrs.get('data-copy'), 'text': []})

    def handle_data(self, value):
        for item in self.stack:
            if item['key']:
                item['text'].append(value)

    def handle_endtag(self, tag):
        if not self.stack or self.stack[-1]['tag'] != tag:
            self.nesting_errors.append(tag)
            return
        item = self.stack.pop()
        if item['key']:
            self.copies.append((item['key'], ''.join(item['text']).strip()))


html = (OUTPUT / 'index.html').read_text(encoding='utf-8')
css = (OUTPUT / 'styles.css').read_text(encoding='utf-8')
js = (OUTPUT / 'app.js').read_text(encoding='utf-8')
strings = json.loads((ROOT / 'content/copy.vi.json').read_text(encoding='utf-8'))['strings']
tokens = json.loads((ROOT / 'design/tokens.json').read_text(encoding='utf-8'))
page = Page()
page.feed(html)
ids = [a['id'] for _, a in page.elements if 'id' in a]
anchors = [a.get('href', '') for t, a in page.elements if t == 'a']
tags = Counter(t for t, _ in page.elements)
resources = [a.get('src') or a.get('href') for t, a in page.elements if t in {'script', 'link', 'img', 'iframe', 'source'}]
check(not page.stack and not page.nesting_errors, 'balanced built HTML')
check(len(ids) == len(set(ids)), 'unique IDs')
check(set(['ml-top', 'ml-main', 'ml-features', 'ml-steps', 'ml-coach', 'ml-trust']) <= set(ids), 'stable anchors')
check(all(a.startswith('#') and len(a) > 1 and a[1:] in ids for a in anchors), 'only real local anchors')
check(all(r and (OUTPUT / r).is_file() for r in resources), 'all public resources exist')
check(all(r and not re.match(r'(https?:)?//', r) for r in resources), 'no external HTML requests')
check(not re.search(r'@import|url\(\s*[\'"]?https?', css, re.I), 'no external CSS requests')
check(set(k for k, _ in page.copies) == set(strings), 'all 78 copy keys in built app')
check(all(strings.get(k) == v for k, v in page.copies), 'all rendered copy exactly matches JSON')
check('{{' not in html, 'no unresolved template')
check(tags['h1'] == tags['main'] == 1, 'one h1 and main')
check('lang="vi"' in html and 'charset="utf-8"' in html, 'Vietnamese UTF-8')
check(not {'form', 'input', 'textarea', 'iframe'} & set(tags), 'no data collection or embedded services')
check(sum('ml-bubble' in a.get('class', '').split() for _, a in page.elements) == 3, 'exactly three static messages')
check(sum('is-on' in a.get('class', '').split() for _, a in page.elements) == 3, 'three of nine progress segments active')
check(sum('ml-card' in a.get('class', '').split() for _, a in page.elements) == 7, 'three principles plus four stages')
check(tags['details'] == tags['summary'] == 1, 'native disclosure')
check(not re.search(r'\b(fetch\s*\(|XMLHttpRequest|WebSocket\s*\(|localStorage|sessionStorage|indexedDB|sendBeacon|document\.cookie)', js), 'no runtime API, tracking, cookies or storage')
check('aria-live' not in html and 'role="status"' not in html, 'no fake live response')
check(all(c.upper() in css.upper() for c in (tokens['color']['navy'], tokens['color']['teal'])), 'exact navy and teal')
check((ROOT / 'src/styles.css').read_bytes() == (OUTPUT / 'styles.css').read_bytes() and (ROOT / 'src/app.js').read_bytes() == (OUTPUT / 'app.js').read_bytes(), 'built CSS and JS match source')
expected_files = {'index.html', 'styles.css', 'app.js', 'assets/mark.svg'}
public_files = {p.relative_to(OUTPUT).as_posix() for p in OUTPUT.rglob('*') if p.is_file()}
check(public_files == expected_files, 'public output contains only four intended files')
texts = [(p.relative_to(ROOT).as_posix(), p.read_text(encoding='utf-8')) for folder in ['src', 'content', 'design', 'assets', 'dist', 'docs', 'qa', 'tools'] for p in (ROOT / folder).rglob('*') if p.is_file() and p.suffix in {'.html', '.css', '.js', '.mjs', '.json', '.svg', '.md', '.py'}]
email_files = [p for p, t in texts if re.search(r'[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}', t, re.I)]
secret_files = [p for p, t in texts if re.search(r'\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----', t)]
check(not email_files, 'no email addresses in delivery text')
check(not secret_files, 'no key-like secrets in delivery text')


def luminance(value):
    rgb = [int(value[i:i+2], 16) / 255 for i in (1, 3, 5)]
    return sum((c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4) * w for c, w in zip(rgb, (.2126, .7152, .0722)))


color = tokens['color']
pairs = [('navy', 'surface', 4.5), ('teal', 'surface', 4.5), ('surface', 'tealHover', 4.5), ('surface', 'tealActive', 4.5), ('textMuted', 'surface', 4.5), ('textMuted', 'heroStart', 4.5), ('teal', 'heroStart', 4.5), ('navy', 'aiBubble', 4.5), ('textMuted', 'aiBubble', 4.5), ('textMuted', 'studentBubble', 4.5), ('textMuted', 'trustBg', 4.5), ('teal', 'trustBg', 4.5), ('textMuted', 'stepsBg', 4.5), ('footerText', 'navy', 4.5), ('accentLight', 'navy', 4.5), ('controlBorder', 'surface', 3), ('focus', 'heroStart', 3), ('focus', 'trustBg', 3)]
contrasts = []
for a, b, minimum in pairs:
    hi, lo = sorted([luminance(color[a]), luminance(color[b])], reverse=True)
    ratio = (hi + .05) / (lo + .05)
    contrasts.append({'pair': f'{a}/{b}', 'ratio': round(ratio, 2), 'minimum': minimum})
    check(ratio >= minimum, f'contrast {a}/{b}')

report = {'kind': 'built-site-static-checks', 'passed': all(c['passed'] for c in checks), 'count': len(checks), 'copy_keys': len(strings), 'checks': checks, 'contrasts': contrasts, 'email_files': email_files, 'secret_files': secret_files, 'public_sha256': {name: hashlib.sha256((OUTPUT / name).read_bytes()).hexdigest() for name in sorted(public_files)}}
if '--json' in sys.argv:
    print(json.dumps(report, ensure_ascii=False, indent=2))
else:
    print(f"{'PASS' if report['passed'] else 'FAIL'}: {len(checks)} built-site checks, {len(strings)} copy keys, {len(contrasts)} color pairs")
    for c in checks:
        if not c['passed']:
            print('FAIL:', c['name'])
sys.exit(0 if report['passed'] else 1)
