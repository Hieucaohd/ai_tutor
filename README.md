# ModelLab AI — Trang 1

Landing `/` bằng HTML/CSS/JavaScript thuần, dựng từ gói thiết kế v1.0 ngày 12/11/2026. Không cần npm, framework, tài khoản hay khóa API. Giữ nguyên 78 khóa trong `content/copy.vi.json` và thiết kế trong `design/tokens.json`.

## Chạy cục bộ

Tại `D:\code\ai_tutor`:

```powershell
python tools/build_site.py
python tools/serve.py
```

Mở `http://127.0.0.1:4173`. Dừng bằng Ctrl+C. Có thể mở trực tiếp `dist/index.html` để đọc ngoại tuyến. Máy chủ xem thử chỉ bind loopback và chỉ phục vụ bốn tệp công khai trong `dist/`; không có API ứng dụng.

## Mã nguồn

- `src/index.template.html`: cấu trúc ngữ nghĩa, placeholder copy, các anchor ổn định.
- `src/styles.css`: CSS `.ml`/`ml-*`, biến `--ml-*`, breakpoint 480/768/1024px.
- `src/app.js`: tăng cường menu, Escape, focus sau anchor và focus khi resize. Không lưu dữ liệu.
- `content/copy.vi.json`: nguồn copy chính thức; không tải JSON lúc chạy.
- `design/tokens.json`: hợp đồng thiết kế; sửa CSS tương ứng nếu thay tokens.
- `dist/`: bản chạy được sinh lại, chỉ có index, CSS, JS và SVG nhận diện.
- `docs/`: đặc tả gốc; xem thêm `docs/08_TRIEN_KHAI_P1.md` cho đường dẫn triển khai thực tế.
- `qa/BAO_CAO_KIEM_TRA.md`: kết quả, bằng chứng và những việc chưa kiểm tra.

Sửa template/copy/CSS/JS ở nguồn rồi chạy lại build. Gói đầu vào được giữ nguyên tại `ModelLab_AI_Trang1_Codex_v1.0_2026-11-12/`, không đưa bản giải nén lặp vào Git hoặc hosting.

## Kiểm tra lại

```powershell
python tools/check_site.py
node --check src/app.js
node tools/browser_qa.mjs
```

Bộ QA trình duyệt cần Node 22+ và Chrome đã mở cổng debug 9222, cùng máy chủ 4173 đang chạy. Nó tạo context riêng, kiểm tra bản `dist/`, lưu `qa/browser-results.json` và ảnh trong `qa/screenshots/`, rồi đóng context của chính nó. Không sử dụng các tab hay phiên ChatGPT có sẵn. Cổng debug chỉ phục vụ công cụ QA trên máy phát triển, không thuộc website.

```powershell
python tools/package_site.py
```

Tạo `delivery/ModelLab_AI_P1.zip`, kèm nguồn, bản chạy, tài liệu và bằng chứng QA; xác minh CRC, đường dẫn và SHA-256. Đây là artifact cục bộ.

## Git và Vercel

`vercel.json` chọn static output `dist/`, không framework, không lệnh build trên máy chủ, không rewrite các route tương lai về landing. Chính sách nội dung chặn kết nối API và tài nguyên ngoài; không có analytics được thêm bởi mã trang.

Khi đã có repository đích và đã xác nhận xuất bản:

```powershell
python tools/build_site.py
python tools/check_site.py
git push -u origin main
vercel.cmd --prod
```

Chưa xuất bản trong bản bàn giao cục bộ. Yêu cầu ban đầu có cả chỉ thị deploy và giới hạn chưa đưa lên Internet; cần xác định chỉ thị áp dụng trước khi phát hành. Không suy từ mã client rằng nhà cung cấp hosting không ghi log kỹ thuật; cần kiểm tra cấu hình hosting khi phát hành.
