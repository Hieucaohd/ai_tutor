# Tiêu chí nghiệm thu Trang 1

**P0:** chặn bàn giao nếu sai phạm vi, dữ liệu hoặc thông điệp sư phạm. **P1:** bắt buộc trước phát hành trang thật. **P2:** chất lượng bổ sung. Đây là checklist yêu cầu; kết quả đã kiểm tra nằm ở `BAO_CAO_KIEM_TRA.md`, không mặc định mọi hàng đều đạt.

| ID | Mức | Điều kiện đạt | Cách kiểm tra |
|---|---|---|---|
| SC-01 | P0 | Một landing page; không tự thêm backend/login/chat/lưu hồ sơ | Đọc mã và tương tác |
| SC-02 | P0 | Không có email quản trị, email cá nhân, API key hoặc secrets trong tệp bàn giao công khai | Quét toàn bộ tệp văn bản, metadata và bundle |
| SC-03 | P0 | H1 đúng “Tự xây dựng mô hình. AI đồng hành, không làm thay.” | Đối chiếu copy JSON và trang |
| SC-04 | P0 | Tự quyết định/thao tác trên Coach 7; AI không cung cấp sẵn mô hình để chép | Đọc hero, nguyên tắc và khối Coach |
| SC-05 | P0 | Demo được ghi ở đầu; chưa triển khai login/chat/lưu được nói rõ | Xem hero và footer |
| SC-06 | P0 | Transcript rõ minh họa, không input/gửi/upload/typing/online giả | Xem trang + mã |
| SC-07 | P0 | Lưu hồ sơ được ghi là dự kiến; không thông báo “đã lưu” hoặc gán tiến trình thật | Đọc toàn trang; kiểm tra storage |
| SC-08 | P0 | Không tự điều khiển/đọc màn hình Coach 7; không dùng phiên ChatGPT cá nhân | Đọc copy và mã |
| SC-09 | P0 | Khối dữ liệu minh bạch, không coi xem trang là đồng ý tham gia | Mở details, đọc nội dung |
| CP-01 | P1 | 78 khóa copy trong JSON được dùng đúng; không mất dấu tiếng Việt | build/check script + xem chữ |
| CP-02 | P1 | Đúng ba lượt transcript, nhãn người nói và Bước 3/9 | HTML + quan sát |
| CP-03 | P1 | Đủ ba thẻ nguyên tắc, bốn giai đoạn, bốn hoạt động Coach | HTML + quan sát |
| CP-04 | P1 | Có phân biệt 4 giai đoạn / 9 bước; hỗ trợ AI không bị giới hạn vào thẻ 03 | Đọc chú thích |
| CP-05 | P1 | Tên các trang tương lai có “Dự kiến”, không link hỏng/nút giả | HTML + tương tác |
| UI-01 | P1 | Nền sáng, navy #183C48, teal #226D78 | Tokens, CSS, quan sát |
| UI-02 | P1 | Desktop hero 2 cột, giá trị 3, quy trình 4, Coach 2 | Xem 1024/1440 |
| UI-03 | P1 | Mobile thứ tự nội dung đúng; không cột chữ quá hẹp, CTA rộng dưới 480 | Xem 320/390 |
| UI-04 | P1 | 768px hero 1, giá trị 3, quy trình 2, Coach 2 cột | Xem 768 |
| UI-05 | P1 | Không tràn ngang/mất chữ tại 320/390/479/480/767/768/1023/1024/1440 | Đo scrollWidth và xem từng layout |
| UI-06 | P1 | Chữ không bị cắt khi zoom/tăng khoảng cách; badge không đè logo | Zoom 200/400%, text spacing |
| UI-07 | P2 | Không layout shift do font/ảnh từ xa; không animation trang trí | Network + quan sát |
| IN-01 | P1 | CTA Khám phá đến #ml-steps; Tìm hiểu đến #ml-coach; Coach CTA trở lại quy trình | Click và xem URL/hash |
| IN-02 | P1 | Logo/Giới thiệu về đầu; skip link tới main | Bàn phím + anchor |
| IN-03 | P1 | Menu đóng mặc định <1024; mở/đóng, nhãn và aria-expanded đồng bộ | Click, Enter, Space |
| IN-04 | P1 | Escape đóng menu, trả focus; chọn link đóng menu và focus tới đích | Bàn phím + inspect focus |
| IN-05 | P1 | Resize qua 1024 reset menu; không focus nằm trong vùng ẩn | Mở menu rồi đổi viewport |
| IN-06 | P1 | Details đóng mặc định, mở/đóng native, không overlay hoặc fetch | Click, Enter/Space, network |
| IN-07 | P1 | Không JS vẫn hiện nav, nội dung, CTA và details đọc được | Tắt JS và reload |
| IN-08 | P1 | Hash/Back/Forward hoạt động bình thường | Thử hai anchor rồi Back/Forward |
| AX-01 | P1 | lang=vi, title/description đúng, chỉ một H1, có main/nav, heading hợp lí | HTML + accessibility tree |
| AX-02 | P1 | Toàn bộ control dùng bàn phím được; thẻ không bị focus như nút | Tab/Shift+Tab toàn trang |
| AX-03 | P1 | Focus rõ, target thiết kế tối thiểu 44px, không bị che | Xem focus và đo target |
| AX-04 | P1 | Các cặp chữ/nền đáp ứng tương phản theo spec | Tính contrast + kiểm tra state |
| AX-05 | P1 | Nhãn vai trò/trạng thái có chữ; SVG trang trí không đọc lặp | Accessibility tree + screen reader |
| AX-06 | P1 | Reduced motion tắt smooth scroll; không chuyển động tự chạy | Hệ điều hành/devtools + dùng CTA |
| AX-07 | P1 | Trình đọc màn hình đọc đúng thứ tự, tên menu, trạng thái details | NVDA/VoiceOver thực tế |
| AX-08 | P2 | Forced colors còn nhận diện điều khiển, focus và thông tin | Chế độ high contrast thực tế |
| TE-01 | P1 | Mở index.html cục bộ đọc được; asset nội bộ tồn tại | File + relative resource check |
| TE-02 | P1 | Khi phục vụ HTTP, / trả thành công và không lỗi JS | HTTP + console |
| TE-03 | P1 | Không fetch/XHR/WebSocket/tracking/cookie/storage ứng dụng | Quét mã + Network/Application |
| TE-04 | P1 | Không console error, không asset 404 | Devtools |
| PK-01 | P1 | ZIP mở được, có README/spec/copy/tokens/prototype/prompts/QA | Kiểm tra ZIP + manifest |
| PK-02 | P1 | Có nguồn gốc, thay đổi từ v0.1 và các quyết định tương lai | Đọc tài liệu 07 |
| PK-03 | P1 | Hướng dẫn Codex dùng được nguyên văn, phạm vi và cách chạy rõ | Đọc prompt và README |

## Nghiệm thu hiểu nội dung với học sinh

Trước nghiên cứu thật, mời một nhóm nhỏ đọc trang mà không giải thích trước, rồi hỏi: (1) Em sẽ tự làm gì? (2) Coach 7 và AI khác nhau thế nào? (3) Hiện tại em đã chat/đăng nhập/lưu hồ sơ được chưa? (4) Xem trang có nghĩa đã đồng ý nghiên cứu không? Ghi lại trả lời và chỗ hiểu sai để sửa copy. Đây là kiểm tra cần tổ chức sau, chưa được thực hiện bằng dữ liệu người dùng trong gói này.
