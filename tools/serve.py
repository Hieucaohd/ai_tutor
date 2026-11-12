"""Loopback-only preview of dist, never the source tree or directory listings."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_PATHS = {'/', '/index.html', '/styles.css', '/app.js', '/assets/mark.svg'}


class LandingHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlsplit(self.path).path not in PUBLIC_PATHS:
            self.send_error(404)
            return
        super().do_GET()

    def do_HEAD(self):
        if urlsplit(self.path).path not in PUBLIC_PATHS:
            self.send_error(404)
            return
        super().do_HEAD()

    def end_headers(self):
        self.send_header('Content-Security-Policy', "default-src 'self'; connect-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'")
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--port', type=int, default=4173)
    args = parser.parse_args()
    if not (ROOT / 'dist/index.html').is_file():
        parser.error('Run python tools/build_site.py first.')
    handler = partial(LandingHandler, directory=str(ROOT / 'dist'))
    with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
        print(f'ModelLab AI: http://127.0.0.1:{args.port}', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass
