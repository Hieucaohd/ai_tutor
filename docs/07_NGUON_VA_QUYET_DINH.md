# Nguồn gốc, thay đổi và quyết định thiết kế

## 1. Nguồn đã truy xuất

- Cuộc trò chuyện **Viết lại đề cương nghiên cứu**, ID `6af08699-9d54-83ec-bd1a-55ead3a1c06a`.
- Lượt thiết kế Trang 1, message `fa3363d9-c811-4bec-9719-43476e26673b`: đã đọc toàn bộ nội dung gồm mockup HTML/CSS v0.1, đặc tả Trang 1, cấu trúc website và định hướng hồ sơ. Bản HTML nguyên gốc được giữ tại `reference/mockup-goc-v0.1.html.txt`.
- Yêu cầu hiện tại: gói ZIP cực chi tiết, tiếng Việt, có prototype, QA và hướng dẫn Codex; nền sáng, navy #183C48, teal #226D78; không tự nhận các chức năng tương lai đã chạy; không hiển thị email quản trị.

Không đưa toàn bộ hội thoại nghiên cứu hoặc thông tin liên hệ cá nhân vào gói. Bản mockup nguồn chỉ được lưu ở dạng `.txt` để đối chiếu, không được chạy nhầm như prototype chính thức. Không có ảnh mockup riêng cần truy xuất: bản xem trước gốc được dựng từ mã HTML đã đọc.

## 2. Giữ nguyên từ mockup v0.1

Tên ModelLab AI; ký hiệu M; H1 hai vế; lead hero; hai CTA; ba lượt transcript minh họa; tên và nội dung ba thẻ nguyên tắc; tên/nội dung bốn giai đoạn; vai trò Coach 7; bốn hoạt động; thứ tự các khu vực; các anchor `ml-top`, `ml-features`, `ml-steps`, `ml-coach`, `ml-trust`; thông điệp không làm thay; nền sáng và hai màu thương hiệu.

## 3. Bổ sung và điều chỉnh có chủ ý ở v1.0

| Điểm | Nguồn ban đầu | Quyết định triển khai v1.0 và lí do |
|---|---|---|
| Thanh đầu | HTML có ba anchor; spec nói đến các trang tương lai | Giữ ba anchor thật; chưa bật login/chat; tên trang dự kiến ở footer dạng text |
| Cỡ chữ | Nhiều đoạn 10–14px vì mockup nhúng | Body 16px, lead 17px, meta 13px; cải thiện đọc trên web đầy đủ |
| Transcript | Có chấm xanh cạnh tiêu đề | Bỏ chấm xanh để không gợi “đang online”; giữ nhãn minh họa và 3/9 |
| Status tổng thể | Badge demo và footer | Thêm thông báo ngay dưới CTA: chưa login/chat/lưu hồ sơ |
| Thẻ lưu hồ sơ | Nội dung đã có từ “dự kiến” | Thêm badge Dự kiến; không đổi câu gốc |
| Quy trình | Bốn thẻ và mô tả chi tiết 9 bước ở spec | Thêm chú thích giải thích 4 giai đoạn tổng quan / 9 bước; AI hỗ trợ ở mọi bước |
| Coach | Có giới hạn không thay thao tác; spec nói không đọc màn hình | Đưa thêm giới hạn đọc màn hình/điều khiển thành copy thấy được |
| Khối dữ liệu | “Hồ sơ học tập chỉ được lưu…” có thể hiểu đã hoạt động | Đổi sang “Hệ thống dự kiến…”; thêm trạng thái hiện tại và details có mục đích, quyền, thời hạn cần chốt, đồng ý |
| Footer | v0.1 | v1.0; giữ thông báo chưa triển khai; thêm tên các trang dự kiến |
| Responsive | Nav bị ẩn hẳn dưới 670px | Menu truy cập bằng chạm/bàn phím; breakpoint 480/768/1024; no-JS vẫn đọc được |
| Icon | Kí tự trang trí, biểu tượng ♧ | SVG nội tuyến có ngữ nghĩa đúng và aria-hidden |
| API trong hội thoại | Có hướng dẫn nền về API và tên API cũ | Không chép trạng thái ngừng hoạt động/giá từ hội thoại; chỉ giữ ranh giới máy chủ và bảo vệ khóa đã đối chiếu nguồn chính thức |

Copy v1.0 đã được chốt trong `content/copy.vi.json`. “Copy chính xác” trong gói nghĩa là dùng đúng bộ copy này; các thay đổi so với nguồn được ghi minh bạch ở bảng trên. Không tự nhận toàn bộ v1.0 là bản chụp nguyên trạng v0.1.

## 4. Nguồn kỹ thuật đối chiếu ngày 12/11/2026

- [CMA — Coach 7](https://cma-science.com/coach7_en/): xác nhận vai trò xây mô hình, kiểm tra giả thuyết và đối chiếu dữ liệu mô hình/thực nghiệm. Landing không đi vào tên menu/lệnh chưa kiểm tra trên phiên bản cụ thể.
- [OpenAI — API Overview](https://developers.openai.com/api/reference/overview): khóa API phải được bảo vệ; tải từ cấu hình bí mật phía máy chủ, không đưa vào client. Đây là hướng tích hợp tương lai, không phải tích hợp trong prototype.
- [W3C — WCAG 2.2](https://www.w3.org/TR/WCAG22/): mục tiêu tương phản, bàn phím, reflow, focus và khả năng tiếp cận. Không tuyên bố đã chứng nhận toàn diện.

Nguồn kỹ thuật chỉ dùng để kiểm tra các điểm vừa nêu; không suy từ đó rằng website đã có tài khoản, năng lực AI, cơ chế lưu dữ liệu hay tuân thủ pháp lí cụ thể.

## 5. Quyết định đã chốt cho P1

HTML/CSS/JS buildless; không tài sản ngoài; font hệ thống; không tracking; một route landing; dùng anchor; menu và details là tương tác duy nhất ngoài điều hướng; không tải dữ liệu; không tài khoản mẫu; không email; không xuất bản; không yêu cầu API key; không tự xây Trang 2/3 trong gói này.

## 6. Quyết định còn mở cho giai đoạn sau

Tên thương hiệu chính thức và domain; framework/hosting của dự án; phiên bản/chế độ Coach 7 và quyền sử dụng; đơn vị chịu trách nhiệm dữ liệu; điều kiện tham gia nghiên cứu; nhà cung cấp auth; cơ chế mã học sinh; thời hạn lưu/xóa và backup; quyền giáo viên/nghiên cứu; cách gửi minh chứng; API/model/hạn mức; nội dung H0–H4/rubric đã duyệt; kênh liên hệ chính thức.

Các quyết định này không cản trở Trang 1 hiện tại và không cần điền giả cho đủ hồ sơ. Khi triển khai phần tương ứng, xác định lại với chủ dự án và cập nhật version.
