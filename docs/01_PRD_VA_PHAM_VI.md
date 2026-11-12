# PRD Trang 1 — Giới thiệu ModelLab AI

**Mã:** ML-P1 · **Phiên bản:** 1.0 · **Ngày:** 12/11/2026 · **Trạng thái:** đặc tả bàn giao, prototype cục bộ.

## 1. Vấn đề và kết quả cần đạt

Học sinh cần hiểu website phục vụ học Vật lí bằng mô hình hóa, không phải nơi lấy sẵn bài giải. Trang đầu phải giải thích được ba vai trò: học sinh quyết định và thao tác, Coach 7 là môi trường thực hành, AI hỗ trợ bằng câu hỏi và gợi ý theo khó khăn. Người xem cũng cần biết chức năng nào mới là dự kiến.

Sau khi đọc hero và các khối đầu, người xem có thể nói lại: “Em tự xây mô hình trên Coach 7; AI giúp em suy nghĩ và kiểm tra; bản hiện tại chỉ là trang giới thiệu mẫu.” Không dùng chỉ số tăng điểm hay hiệu quả nghiên cứu chưa có bằng chứng.

## 2. Đối tượng và bối cảnh

| Người dùng | Nhu cầu | Đáp ứng ở Trang 1 |
|---|---|---|
| Học sinh THPT | Biết cách học, biết mình phải làm gì | Hero, ba nguyên tắc, bốn giai đoạn, ví dụ câu hỏi |
| Giáo viên | Biết AI được giới hạn ra sao | Thông điệp không làm thay, vai trò giám sát |
| Người nghiên cứu | Biết hướng lưu minh chứng và đánh giá | Tóm tắt dữ liệu dự kiến, kiến trúc tương lai trong tài liệu |
| Người giám hộ/người xem công khai | Biết dữ liệu có được thu không | Trạng thái demo rõ, thông tin dự kiến và điều kiện trước khi thu |

Ưu tiên máy tính vì học sinh có thể mở Coach 7 cùng trình duyệt. Mobile vẫn phải đọc đầy đủ, điều hướng bằng chạm và bàn phím được. Không giả định website đọc được Coach 7 đang chạy trên máy học sinh.

## 3. Phạm vi phát hành P1

**Có:** landing page `/`; logo chữ; ba liên kết anchor; hero hai cột; transcript minh họa tĩnh; ba thẻ giá trị; bốn giai đoạn; giải thích Coach 7; thông tin bảo vệ dữ liệu có thể mở rộng; footer và tên các trang dự kiến; menu thu gọn trên màn hình nhỏ; hỗ trợ bàn phím; mã giao diện cục bộ.

**Chưa có:** tài khoản, đăng nhập, chat thật, API, upload, tự động điều khiển Coach 7, cơ sở dữ liệu, lưu tiến trình, nhật kí theo người dùng, đánh giá tự động, quản trị, phân tích truy cập, cookie tracking, email liên hệ công khai, website đã xuất bản.

Không dựng một “hệ thống giả” dùng localStorage để trông như đã đăng nhập hoặc đã lưu. Không yêu cầu khóa API để mở landing page. Không có form thu dữ liệu học sinh trên Trang 1.

## 4. Cấu trúc và yêu cầu theo khu vực

| Mã | Khu vực / anchor | Nội dung và hành vi bắt buộc |
|---|---|---|
| P1-01 | Header / `#ml-top` | Logo M + ModelLab AI; Giới thiệu, Coach 7, Quy trình học; badge Bản thiết kế demo; menu mobile |
| P1-02 | Hero | Một H1 đúng copy; hai CTA anchor; phiên minh họa Bước 3/9 có 9 đoạn tiến trình và 3 lượt lời; không input chat |
| P1-03 | `#ml-features` | Ba thẻ Học sinh làm chủ / Gợi ý đúng lúc / Lưu hành trình học tập; thẻ lưu có badge Dự kiến |
| P1-04 | `#ml-steps` | Bốn giai đoạn 01–04; ghi rõ đây là tổng quan, không thay thế tiến trình 9 bước |
| P1-05 | `#ml-coach` | Vai trò Coach 7; bốn hoạt động; CTA trở lại quy trình; giới hạn website không tự thao tác/đọc màn hình |
| P1-06 | `#ml-trust` | Trạng thái chưa thu/lưu hồ sơ trong prototype; dự kiến dữ liệu, mục đích, quyền truy cập, đồng ý, thời hạn và quyền xử lí |
| P1-07 | Footer | Tên/version; thông báo chưa triển khai; bốn tên trang dự kiến dạng văn bản, không nút giả |

## 5. User stories và điều kiện chấp nhận

- **US01:** Là học sinh, tôi muốn biết trách nhiệm của mình. H1 và thẻ đầu nói rõ tự quyết định; không nơi nào hứa làm toàn bộ mô hình.
- **US02:** Tôi muốn hình dung cách AI hỏi. Có transcript tĩnh, nhãn người nói, trạng thái minh họa; không dấu “online”, typing indicator hay điểm kết nối màu xanh.
- **US03:** Tôi muốn biết bắt đầu từ đâu. Nhấn “Khám phá cách học” đến khối bốn giai đoạn. Nhấn “Tìm hiểu Coach 7” đến khối Coach 7.
- **US04:** Tôi xem trên điện thoại. Không mất nội dung, không cuộn ngang từ 320 CSS px, có menu mở được bằng bàn phím và chạm.
- **US05:** Tôi muốn biết dữ liệu của mình được sử dụng thế nào. Khối dữ liệu nói ở thì dự kiến và công bố những điều cần làm rõ trước khi thu thật; không gợi ý đã đồng ý chỉ vì xem trang.
- **US06:** Tôi chưa muốn đăng nhập. Đọc toàn trang không cần tài khoản. Không bị chuyển sang ChatGPT cá nhân hoặc yêu cầu nhập email.

## 6. Trạng thái sản phẩm

| Năng lực | P1 | Điều kiện để thay nhãn |
|---|---|---|
| Landing, anchor, menu, mở thông tin dữ liệu | Có trong prototype | Sau QA layout/hành vi |
| Hướng dẫn Coach 7 | Dự kiến | Có nội dung đã thẩm định, route thật, kiểm tra thao tác theo phiên bản |
| AI trợ giảng | Minh họa tĩnh | Máy chủ, xác thực, quy tắc sư phạm, kiểm thử phản hồi, giới hạn sử dụng |
| Đăng nhập | Chưa triển khai | Xác thực và quyền truy cập đã kiểm thử |
| Hồ sơ học tập | Chưa triển khai | Lưu thực, chính sách và đồng ý phù hợp, đọc/ghi theo đúng chủ sở hữu |

Không đổi badge thủ công để tạo cảm giác các năng lực đã hoạt động. Nếu triển khai thêm một phần, cập nhật cả footer, thông báo hero, khối dữ liệu và acceptance criteria.

## 7. Chất lượng và giới hạn

- Ngôn ngữ thống nhất “Vật lí”, “mô hình hóa”, “Coach 7”, “AI trợ giảng”.
- Nội dung HTML có sẵn ngay, không chờ tải JSON hay JavaScript để hiện chữ.
- Không tải font, ảnh, CDN, analytics hoặc script bên thứ ba trong prototype.
- Không đặt thời hạn lưu dữ liệu tùy ý. Các quyết định còn mở nằm ở tài liệu 07.
- Không tuyên bố đã đạt chứng nhận WCAG; dùng WCAG 2.2 AA làm mục tiêu thiết kế và kiểm tra theo tài liệu 03/QA.
- Trang chủ trả HTML thành công khi phục vụ qua HTTP; anchor hợp lệ; các đường dẫn tương lai chưa có link điều hướng.

## 8. Hoàn thành P1 khi nào?

Copy đúng JSON; bố cục đúng tokens/spec; toàn bộ hành động hoạt động đúng; trạng thái demo rõ ở đầu trang, transcript và footer; không rò email/quyền quản trị; hoàn thành kiểm tra ưu tiên P0/P1 trong acceptance criteria. Các điểm chưa kiểm tra thực tế phải được báo rõ, không đánh dấu mặc định là đạt.
