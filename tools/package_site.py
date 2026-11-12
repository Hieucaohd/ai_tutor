"""Package only the intended implementation and QA, with a verified manifest."""
from pathlib import Path
import hashlib
import json
import zipfile

ROOT = Path(__file__).resolve().parents[1]
folders = ['src', 'content', 'design', 'assets', 'dist', 'docs', 'qa', 'tools', 'reference', 'prompts']
files = [ROOT / name for name in ['README.md', '.gitattributes', '.gitignore', '.vercelignore', 'vercel.json']]
for folder in folders:
    files.extend(p for p in (ROOT / folder).rglob('*') if p.is_file() and '__pycache__' not in p.parts and p.suffix != '.pyc' and p.name != 'package-results.json')
files = sorted(set(files))
manifest = {p.relative_to(ROOT).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in files}
delivery = ROOT / 'delivery'
delivery.mkdir(exist_ok=True)
archive = delivery / 'ModelLab_AI_P1.zip'
with zipfile.ZipFile(archive, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=9) as package:
    for p in files:
        package.write(p, p.relative_to(ROOT).as_posix())
    package.writestr('MANIFEST_SHA256.json', json.dumps({'algorithm': 'SHA-256', 'files': manifest}, ensure_ascii=False, indent=2) + '\n')
with zipfile.ZipFile(archive) as package:
    assert package.testzip() is None
    assert all(not name.startswith('/') and '..' not in Path(name).parts for name in package.namelist())
    for name, expected in manifest.items():
        assert hashlib.sha256(package.read(name)).hexdigest() == expected, name
report = {'archive': 'delivery/ModelLab_AI_P1.zip', 'files': len(manifest) + 1, 'bytes': archive.stat().st_size, 'crc': 'PASS', 'safe_paths': 'PASS', 'sha256_manifest': 'PASS', 'archive_sha256': hashlib.sha256(archive.read_bytes()).hexdigest()}
(ROOT / 'qa/package-results.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
print(json.dumps(report))
