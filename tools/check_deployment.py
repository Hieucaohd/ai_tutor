"""Unauthenticated HTTPS checks of the deployed static landing and assets."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen
import hashlib
import json

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://modellab-ai.vercel.app'
EXPECTED = {'/': 'index.html', '/styles.css': 'styles.css', '/app.js': 'app.js', '/assets/mark.svg': 'assets/mark.svg'}
MISSING = ['/huong-dan', '/tro-giang', '/ho-so', '/dang-nhap', '/quyen-rieng-tu', '/content/copy.vi.json', '/docs/01_PRD_VA_PHAM_VI.md', '/.git/config']


def inspect(path):
    request = Request(ORIGIN + path, headers={'User-Agent': 'ModelLab-Deployment-QA/1.0'})
    try:
        response = urlopen(request, timeout=25)
    except HTTPError as error:
        response = error
    with response:
        value = response.read()
        headers = response.headers
        result = {'path': path, 'status': response.code, 'final_url': response.url}
        if path in EXPECTED:
            result.update({
                'content_type': headers.get_content_type(),
                'sha256_matches_dist': hashlib.sha256(value).digest() == hashlib.sha256((ROOT / 'dist' / EXPECTED[path]).read_bytes()).digest(),
                'content_security_policy': headers.get('Content-Security-Policy'),
                'no_application_cookie': not headers.get('Set-Cookie'),
                'nosniff': headers.get('X-Content-Type-Options') == 'nosniff',
            })
            result['passed'] = response.code == 200 and result['sha256_matches_dist'] and result['no_application_cookie'] and result['nosniff'] and "connect-src 'none'" in (result['content_security_policy'] or '')
        else:
            result['passed'] = response.code == 404
        return result


if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=4) as workers:
        checks = list(workers.map(inspect, [*EXPECTED, *MISSING]))
    report = {'origin': ORIGIN, 'authentication': 'none; no deployment-protection bypass', 'passed': all(c['passed'] for c in checks), 'count': len(checks), 'checks': checks, 'limitations': ['Does not audit provider-side access logs or retention.']}
    (ROOT / 'qa/deployment-results.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
    print(json.dumps(report, ensure_ascii=False, indent=2))
    raise SystemExit(0 if report['passed'] else 1)
