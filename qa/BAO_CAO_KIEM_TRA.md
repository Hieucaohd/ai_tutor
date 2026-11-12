# Báo cáo kiểm tra bản triển khai — 12/11/2026

Đã có mã chạy tại `dist/`, kiểm thử qua `http://127.0.0.1:4173`, đã push lên https://github.com/Hieucaohd/ai_tutor và deploy production tại https://modellab-ai.vercel.app. Kết quả: **42/42 kiểm tra tĩnh, 88/88 kiểm tra trình duyệt local và 12/12 kiểm tra HTTPS production đạt**. Không coi đây là chứng nhận WCAG hoặc nghiệm thu nghiên cứu với học sinh; các phần chưa làm được ghi riêng bên dưới.

## Môi trường và bằng chứng

- Windows, Node 22.20.0, Python 3.13, Chrome 157.0.8103.51 tại cổng 9222 do chủ dự án chỉ định.
- Ngày kiểm tra theo múi giờ Asia/Saigon: 12/11/2026.
- Kiểm tra **bản ứng dụng `dist/`**, không dùng kết quả prototype cũ để công nhận bản triển khai.
- `browser-results.json`: từng phép kiểm tra, phép đo layout, cây heading và danh sách tài nguyên.
- `static-results.json`: copy, cấu trúc, phạm vi, tài nguyên, quét thông tin riêng, tương phản và SHA-256 của bốn tệp công khai.
- `http-results.json`: bốn phản hồi 200 và tám phản hồi 404 mong đợi.
- `deployment-results.json`: 12 kiểm tra HTTPS công khai, không đăng nhập hoặc dùng bypass; bốn tệp trên Vercel có SHA-256 khớp dist và security headers; tám route/tệp chưa công khai trả 404.
- `vercel-inputs.json`: kiểm tra trước upload; đủ bốn tệp dist, loại source/tài liệu/ZIP/tệp môi trường. Không chứa giá trị credential.
- `screenshots/width-*.png`, `screenshots/text-spacing-*.png`, `screenshots/no-js-320.png`, `screenshots/forced-colors.png`: ảnh Chrome thật, không phải wireframe.
- Gói gốc giữ nguyên, đã chạy `python tools/check_package.py`: 68/68 đạt. Kết quả này chỉ xác nhận đầu vào.

## Đã kiểm tra thực tế

| Tiêu chí | Kết quả | Cách xác minh |
|---|---|---|
| SC-01–SC-09 | Đạt trong phạm vi P1 | Đọc mã, JSON, DOM và ảnh; demo rõ ở đầu/transcript/footer; dữ liệu ở thì dự kiến; không login/chat/API/lưu hồ sơ, email hay secret; học sinh tự thao tác Coach 7 |
| CP-01–CP-05 | Đạt | 78 khóa so khớp ở HTML sinh ra và DOM Chrome; ba lượt, 3/9; ba nguyên tắc, bốn giai đoạn/bốn hoạt động; không link tương lai |
| UI-01–UI-05 | Đạt | Xem ảnh 320/390/479/480/767/768/1023/1024/1440; đo grid, container, scrollWidth và hình học phần tử ở các kích thước này cùng 1920 |
| UI-06 | Đạt phần text spacing; zoom thật chưa kiểm tra | Line-height 1.5, letter-spacing .12em, word-spacing .16em, paragraph spacing 2em tại 320/390/1440; không cắt chữ hoặc tràn ngang, có ảnh |
| UI-07 | Đạt trong lần tải local | Font hệ thống, SVG nội bộ; không font/ảnh/script xa hoặc animation trang trí |
| IN-01–IN-02 | Đạt | CTA bằng chuột; logo/skip link bằng Enter; hash đúng, focus tới đích; focus skip link rõ |
| IN-03–IN-05 | Đạt | Enter/Space mở menu, Tab/Shift+Tab đi qua liên kết, Escape đóng và trả focus; nhãn/ARIA đồng bộ; resize 1023↔1024 không để focus trong nav bị ẩn |
| IN-06 | Đạt | Details native mở bằng Enter, đóng bằng Space tại từng viewport; nằm trong luồng trang, không gọi dữ liệu |
| IN-07 | Đạt | Tắt thực thi script rồi reload 320px: nav vẫn hiện, nút menu ẩn, nội dung có sẵn; details và CTA native hoạt động |
| IN-08 | Đạt | History Back/Forward phục hồi hash bằng lịch sử native |
| AX-01–AX-04 | Đạt bằng mã/Chrome | Heading hierarchy trong accessibility tree; thứ tự Tab thực tế; control nhìn thấy có kích thước ≥44px; 18 cặp màu đạt ngưỡng tương phản |
| AX-05 | Đạt phần DOM/accessibility; chưa nghe screen reader | Icon trang trí ẩn khỏi accessibility, có nhãn người nói, không live region; không thay thế AX-07 |
| AX-06 | Đạt | Emulate prefers-reduced-motion: reduce, tải mới: scroll-behavior auto; CTA tới đích ngay; không animation tự chạy |
| AX-08 | Đạt phần mô phỏng | Emulate forced-colors: active bằng Chrome; điều khiển còn border; lưu ảnh; chưa thử high contrast OS thật |
| TE-01 | Đạt kiểm tra tài nguyên tương đối | Tất cả tài nguyên của dist/index.html tồn tại; chưa mở file:// thực tế trong lượt QA này |
| TE-02–TE-04 | Đạt | GET / và ba tài nguyên đều 200; không console/runtime/network error trong context QA riêng; không yêu cầu bên thứ ba; cookie/localStorage/sessionStorage/IndexedDB trống |
| PK-01 | Đạt | Chạy package_site.py: giải nén kiểm tra CRC, safe paths và SHA-256 cho từng tệp; chi tiết package-results.json |
| PK-02–PK-03 | Đạt đọc tài liệu/chạy lệnh | Có spec 01–07, ghi nhận thay đổi triển khai 08, README, copy/tokens, nguồn, dist và bộ QA; lệnh build/serve/check đã chạy thực tế |
| Production HTTP | Đạt 12/12 | GET /, CSS, JS, SVG đều 200 và khớp SHA-256 với dist; đúng content type; CSP/nosniff có hiệu lực, không Set-Cookie trong các phản hồi này; route tương lai và tệp nguồn/Git trả 404 |

Thanh cuộn dọc Windows chiếm 15 CSS px. Phép đo chống tràn dùng `scrollWidth <= clientWidth`, không so với innerWidth. Container giữ gutter 20px dưới 768 và 32px từ 768, max 1160; không dùng overflow-x:hidden để che lỗi. Breakpoint kiểm tra theo viewport CSS.

## Lỗi đã sửa

**IN-05 — focus khi thu qua breakpoint:** Chromium có thể blur link khi CSS ẩn nav trước lúc matchMedia callback chạy. Bản prototype chỉ kiểm tra activeElement trong callback nên có thể bỏ lỡ link vừa mất focus. `src/app.js` ghi nhận focus trong navigation, xóa ghi nhận khi focus sang vùng khác, và trả focus về nút khi nav bị thu gọn. Kiểm tra lại qua 1023→1024→1023 đạt.

Anchor có modifier giữ hành vi native; bộ xử lí focus chỉ áp dụng kích hoạt thông thường. Các khác biệt trong bộ QA (scrollbar Windows, focus của context thử và cuộn mượt còn đang chạy từ ca trước) đã được sửa trong công cụ kiểm thử, không thay thiết kế để ép kết quả.

Khi kiểm tra gói Vercel trước upload, quy tắc ignore `assets` ban đầu khớp cả `dist/assets`. Đã giới hạn thành `/assets/` và xác minh SVG hiện diện trước lần deploy đầu tiên. Thư mục `delivery` cũng được loại khỏi gói upload.

## Phát hành

- Git remote: `https://github.com/Hieucaohd/ai_tutor.git`, nhánh `main`, push thường, không force.
- Vercel project: `modellab-ai`; production alias: `https://modellab-ai.vercel.app`.
- Bản deploy đầu tiên: `dpl_Dxa6s5DusqcFfW95u5BJe4mY1BF5`, trạng thái READY, từ commit `d9e2039`.
- Các commit báo cáo sau deployment không thay đổi bốn tệp công khai. Không tuyên bố đã chạy lại 88 ca browser trên URL production; đã kiểm tra HTTPS và đối chiếu bytes với bản dist đã chạy browser QA.
- Chủ dự án đã xác nhận cho phép deploy bản landing. Các nhãn demo/chưa có login, AI thật và hồ sơ vẫn đúng; phát hành landing không bật những tính năng tương lai.

## Chưa kiểm tra hoặc chưa thực hiện

- **Zoom trình duyệt thật 200%/400%:** công cụ điều khiển cửa sổ Chrome hết thời gian chờ cấp quyền ứng dụng. Không coi resize viewport hay thay text spacing là đã kiểm tra zoom thật.
- **AX-07:** chưa dùng NVDA/VoiceOver với tiếng Việt; accessibility tree không thay thế kiểm tra nghe thực tế.
- High contrast của Windows thật, cảm ứng trên thiết bị vật lý, Safari/Firefox chưa thử. Forced colors và kích thước mobile ở trên là mô phỏng trong Chrome desktop.
- Chưa tổ chức kiểm tra hiểu nội dung với học sinh. Không thu dữ liệu học sinh để thực hiện QA này.
- Chưa mở trực tiếp file://; HTTP đã kiểm tra đầy đủ.
- Chưa thẩm định log truy cập và chính sách lưu log phía nhà cung cấp Vercel. Kiểm tra HTTPS/header không xác nhận nhà cung cấp không lưu log.

Đăng nhập, API AI, hồ sơ, upload, đồng ý tham gia có hiệu lực và phân quyền production không áp dụng ở P1; không được ghi là tính năng đã kiểm thử.

## Chạy lại

```powershell
python tools/build_site.py
python tools/check_site.py
node --check src/app.js
python tools/serve.py
```

Trong terminal khác, với Chrome 9222 đang mở:

```powershell
node tools/browser_qa.mjs
python tools/check_deployment.py
python tools/package_site.py
```

Các bằng chứng QA chỉ xác nhận phiên bản nguồn hiện tại; sau khi sửa giao diện hoặc copy, chạy lại nhóm kiểm tra chịu ảnh hưởng và sinh lại dist/gói.
