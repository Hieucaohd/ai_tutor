"""Build the public landing page using only the Python standard library."""
from pathlib import Path
import html
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1]


def build():
    strings = json.loads((ROOT / 'content/copy.vi.json').read_text(encoding='utf-8'))['strings']
    template = (ROOT / 'src/index.template.html').read_text(encoding='utf-8')
    used = set(re.findall(r'\{\{([\w.]+)\}\}', template))
    if used != set(strings):
        raise ValueError(f'Missing or unused copy keys: {used ^ set(strings)}')
    rendered = re.sub(r'\{\{([\w.]+)\}\}', lambda m: html.escape(strings[m[1]], quote=True), template)
    output = ROOT / 'dist'
    output.mkdir(exist_ok=True)
    (output / 'index.html').write_text(rendered, encoding='utf-8', newline='\n')
    for name in ('styles.css', 'app.js'):
        shutil.copyfile(ROOT / 'src' / name, output / name)
    (output / 'assets').mkdir(exist_ok=True)
    shutil.copyfile(ROOT / 'assets/mark.svg', output / 'assets/mark.svg')
    print(f'Built dist/: one landing route, {len(strings)} exact copy keys, four public files.')


if __name__ == '__main__':
    build()
