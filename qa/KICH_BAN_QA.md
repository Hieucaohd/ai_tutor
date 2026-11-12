# Kịch bản design QA cho Codex/người nghiệm thu

## Chuẩn bị

Giữ một bản prototype nguyên gói để đối chiếu. Mở index.html trực tiếp hoặc phục vụ qua HTTP theo README. Ghi ngày, trình duyệt/version, OS, zoom, kích thước viewport CSS px và phiên bản mã. Kết quả phải tách **đạt / lỗi / chưa kiểm tra / không áp dụng**. Không dùng ảnh wireframe làm bằng chứng đã chạy trình duyệt.

## A. Đọc nội dung và kiểm tra phạm vi

1. Nhìn phần đầu trang: tên ModelLab AI, badge demo, H1 hai vế, hai CTA, ghi chú chưa triển khai phải hiện được mà không cần mở popup.
2. Đọc transcript: Bước 3/9, ba lượt, có nhãn người nói và minh họa; không cảm giác đã kết nối AI thật.
3. Đọc ba giá trị và bốn giai đoạn. “Lưu” có Dự kiến; chú thích giải thích 4/9; không coi hỗ trợ chỉ diễn ra sau tạo mô hình.
4. Đọc khối Coach: thao tác thuộc học sinh; không tự điều khiển/đọc màn hình.
5. Mở thông tin dữ liệu: mục đích, dữ liệu, quyền truy cập, thời hạn cần công bố, yêu cầu xử lí, đồng ý riêng. Footer không email; tên trang tương lai không nhấp được.

## B. Ma trận responsive

| Viewport | Điều cần nhìn |
|---|---|
| 320×800 | Logo/badge/menu không đè; CTA xếp dọc; bubble còn dễ đọc; quy trình 1 cột |
| 390×844 | Toàn bộ hero, transcript, footer xuống dòng tự nhiên |
| 479 và 480 | Quy trình đổi từ 1→2 cột; CTA không gây tràn |
| 767 và 768 | Giá trị 1→3; Coach 1→2; không cắt thẻ |
| 1023 và 1024 | Menu thu gọn → nav desktop; hero 1→2, quy trình 2→4 |
| 1440×1000 | Container 1160; khoảng trắng cân đối; transcript không quá rộng |
| 1920×1080 | Nội dung vẫn giới hạn chiều rộng, không kéo giãn toàn màn hình |

Quan sát từng section và mở details ở mỗi kích thước hẹp. Kiểm tra `document.documentElement.scrollWidth <= document.documentElement.clientWidth` trong môi trường kiểm tra cho phép, nhưng không dùng riêng phép đo thay cho nhìn chữ. Không “sửa” lỗi bằng overflow-x:hidden.

## C. Bàn phím và tương tác

Tải mới → Tab thấy skip link → Enter tới main. Tải lại → Tab theo logo/nav/CTA/details, Shift+Tab quay lại được. Tại mobile: focus nút Menu → Enter mở → Tab lần lượt tới ba link → Escape đóng/trở lại nút. Mở lại bằng Space → chọn Coach 7 → URL/hash đúng, menu đóng, focus tới khối Coach. Chọn Xem quy trình học → quay về khối quy trình. Browser Back/Forward không mất nội dung.

Mở menu ở 1023 rồi chuyển sang 1024; nav hiện, button ẩn. Chuyển ngược; nav đóng, focus không bị mắc trong link ẩn. Details dùng Enter và Space; nội dung nằm trong dòng trang và không gọi dữ liệu. Mọi focus phải rõ, không chỉ đổi màu rất nhẹ.

## D. Khả năng tiếp cận và trường hợp dự phòng

Tắt JS rồi tải lại: nav hiện, không nút vô dụng, copy/CTA/details vẫn dùng được. Bật reduced motion: CTA không cuộn mượt. Thử zoom 200% và 400%, tăng letter/word/line spacing; đọc đủ chữ không cắt. Dùng screen reader đọc heading, transcript, menu expanded và details; không đọc icon như dữ liệu, không báo hội thoại trực tiếp. Thử forced colors nếu có.

## E. Mã, tài nguyên và dữ liệu

Chạy check_package.py nếu vẫn dùng cấu trúc nguyên gói. Xem console không lỗi và tài nguyên không 404. Network không gọi bên thứ ba; không có analytics/storage/API từ ứng dụng. Kiểm tra Application không cookie hoặc storage được app tạo. Quét email/secrets trong toàn bộ bundle và metadata. Với hosting thực tế, kiểm tra riêng log truy cập của hạ tầng, không suy từ code client rằng nhà cung cấp không ghi log.

## F. Ghi và sửa lỗi

Mỗi lỗi ghi: ID acceptance liên quan; viewport; bước tái hiện; thực tế; mong đợi; ảnh nếu công cụ cho phép; mức ảnh hưởng; tệp sửa; kết quả kiểm tra lại. Chỉ kiểm tra lại nhóm bị ảnh hưởng sau sửa, không báo toàn bộ ma trận đã chạy nếu chưa làm. Không đánh dấu login/API/lưu hồ sơ là lỗi của P1 vì chúng nằm ngoài phạm vi; chỉ đánh lỗi khi giao diện nhận sai là đã có.
