# Nguyên tắc sư phạm và bảo vệ dữ liệu

## 1. Nguyên tắc xuyên suốt

**Học sinh tự mô hình hóa; AI đồng hành, không làm thay.** Học sinh lựa chọn giả định, đại lượng, quan hệ, điều kiện ban đầu; thao tác trên Coach 7; dự đoán, phân tích và giải thích việc sửa mô hình. AI hỏi để làm rõ cách hiểu, phản hồi vào lập luận và hỗ trợ từng phần khi cần.

Landing không nói “AI xây mô hình hoàn chỉnh”, “tự động giải mọi bài tập”, “đánh giá chính xác năng lực”, “theo dõi toàn bộ màn hình” hoặc “tự lưu tất cả dữ liệu”. Không kết luận năng lực tự lực từ chất lượng sản phẩm có AI hỗ trợ. Giáo viên/người nghiên cứu giám sát và đưa ra đánh giá.

## 2. Bốn giai đoạn trên landing và chín bước chi tiết

Bốn thẻ là sơ đồ truyền thông để đọc nhanh. Hỗ trợ AI có thể diễn ra ở mọi bước, không chỉ sau khi đã tạo mô hình. Học sinh được quay lại kiểm tra/sửa đổi; không khóa quy trình tuyến tính.

| Bước dự kiến | Việc học sinh làm | Câu hỏi gợi mở tham khảo cho thiết kế Trang 2/3 |
|---|---|---|
| 1. Xác định vấn đề | Chọn hiện tượng, đầu ra muốn dự đoán | Em muốn mô hình dự đoán đại lượng nào? Em sẽ kiểm tra dự đoán đó bằng cách nào? |
| 2. Xác định hệ và giả định | Chọn hệ, yếu tố giữ/bỏ và điều kiện | Những yếu tố nào có thể tạm bỏ qua, và trong điều kiện nào? |
| 3. Xác định đại lượng | Phân biệt đại lượng thay đổi/không đổi | Đại lượng nào thay đổi theo thời gian? Đại lượng nào không đổi trong một lần chạy? |
| 4. Thiết lập quan hệ | Giải thích quan hệ Vật lí–toán học | Em dựa vào quan hệ Vật lí nào? Đơn vị và dấu của quan hệ có hợp lí không? |
| 5. Xây dựng trên Coach 7 | Chuyển quan hệ sang thành phần/kết nối | Em định biểu diễn đại lượng nào bằng biến trạng thái? Kết nối nào thể hiện sự phụ thuộc? |
| 6. Thiết lập điều kiện | Chọn giá trị ban đầu, thời gian, bước tính | Điều kiện ban đầu có phù hợp với cách bắt đầu thí nghiệm không? |
| 7. Thực thi mô hình | Dự đoán rồi chạy/quan sát | Trước khi chạy, em dự đoán đồ thị ra sao? Kết quả khác dự đoán ở đâu? |
| 8. Kiểm tra mô hình | So dữ liệu và xét tính hợp lí | Sai khác có thể do phép đo, giả định hay quan hệ trong mô hình? |
| 9. Điều chỉnh mô hình | Đề xuất, thử và giải thích sửa đổi | Em muốn kiểm tra yếu tố nào trước? Em dự đoán thay đổi đó tác động thế nào? |

Đây là khung tham khảo, không phải bộ điều phối AI đã chạy. Câu hỏi khái quát bổ sung ở bước 4/6/7/8/9 được biên soạn trong gói, không gán là trích nguyên văn cuộc trò chuyện. Transcript hero giữ đúng ba lượt lời từ mockup.

## 3. Quy tắc hỗ trợ tương lai

Trước khi gợi ý, hỏi học sinh đã thử gì và đang vướng ở đâu. Ưu tiên một câu hỏi có mục tiêu; chờ suy nghĩ của học sinh; tăng hỗ trợ từng phần khi cần. Hướng dẫn thao tác phần mềm được phép khi đúng khó khăn, nhưng không cung cấp toàn bộ mô hình hoàn chỉnh để sao chép. Sau gợi ý, yêu cầu học sinh tự chọn/thực hiện và giải thích bước tiếp theo.

Ví dụ khi mô hình giữ biên độ không đổi còn dữ liệu giảm dần: hỏi học sinh nhận thấy khác biệt gì, xem lại giả định liên quan mất mát cơ năng, hỏi cách kiểm tra giả định. Không lập tức chèn một công thức lực cản vào mô hình của học sinh. Không phán “mô hình đúng” chỉ vì hai đồ thị nhìn gần nhau.

Nguồn nhắc các mức hỗ trợ H0–H4 và rubric R1–R8, nhưng gói Trang 1 không đóng băng định nghĩa từng mức, không triển khai điểm số. Trước khi làm Trang 3 phải lấy bản rubric/quy tắc đã được chủ dự án duyệt, có version. Không tự sáng tác một thang điểm rồi coi là chuẩn nghiên cứu đã kiểm định.

## 4. Dữ liệu trong bản hiện tại

Prototype không có form, API, analytics, tracking pixel, cookie ứng dụng hoặc storage trình duyệt. Menu và details chỉ thay đổi giao diện trong bộ nhớ. Khi xem qua máy chủ, hạ tầng vẫn có thể ghi log truy cập kỹ thuật; “không thu/lưu hồ sơ học tập” không có nghĩa mọi trình duyệt hoặc nhà cung cấp hosting đều không có bất kỳ log nào. Khi xuất bản thật phải kiểm tra log và dịch vụ bên thứ ba để thông báo chính xác.

Không hiển thị email quản trị; không đưa nó vào ví dụ JSON, thông tin SEO, mã HTML comment, JavaScript, ảnh chụp, link mailto, Git history bàn giao hoặc fixture test. Dùng role/ID nội bộ ở máy chủ cho phân quyền, không công khai địa chỉ cá nhân.

## 5. Dữ liệu học tập dự kiến ở giai đoạn sau

| Nhóm dữ liệu | Mục đích | Tối thiểu hóa/giới hạn |
|---|---|---|
| ID học sinh, phiên, nhiệm vụ | Liên kết tiến trình | Ưu tiên mã thay cho tên/email trong phân tích |
| Hội thoại và thời điểm | Phân tích cách học và phản hồi | Chỉ thu theo phạm vi đã thông báo; nhắc không gửi dữ liệu cá nhân không cần thiết |
| Bước 1–9, mức hỗ trợ | Xem quá trình mô hình hóa | Nhãn AI chỉ là đề xuất, người có quyền được kiểm tra/hiệu chỉnh |
| Minh chứng chủ động gửi | Đối chiếu mô hình/đồ thị/sản phẩm | Hạn chế metadata và nội dung nhận dạng; không tự chụp màn hình |
| Quyết định/sửa đổi của học sinh | Nhận biết quyền chủ động | Không thay thế diễn giải sư phạm bằng số lượt chat |
| Version quy tắc/mô hình/rubric | Truy vết nghiên cứu | Không cần lưu secrets hoặc khóa API |

Hồ sơ theo tài khoản là mục tiêu thiết kế tương lai, không hoạt động trong Trang 1. Học sinh chỉ xem dữ liệu mình được phép; người nghiên cứu/giáo viên chỉ xem phạm vi được cấp quyền. Xuất dữ liệu nghiên cứu cần giảm khả năng nhận dạng và kiểm soát người nhận.

## 6. Các quyết định phải chốt trước khi thu dữ liệu thật

Chủ dự án/đơn vị nghiên cứu xác định người chịu trách nhiệm dữ liệu; mục đích học tập và nghiên cứu; danh mục dữ liệu; cơ sở/quy trình đồng ý phù hợp; cách tham gia/rút tham gia; vai trò người giám hộ khi cần; người được truy cập; thời hạn lưu và bản sao lưu; quy trình xuất/sửa/xóa; nhà cung cấp AI/hosting và dữ liệu chuyển cho họ; kênh tiếp nhận yêu cầu; cách xử lí sự cố.

Không gán sẵn “lưu 30/90/365 ngày”; không hứa “bảo mật tuyệt đối”, “xóa ngay tất cả bản sao”, “không bao giờ chia sẻ” hoặc “đúng mọi quy định”. Tài liệu này là yêu cầu thiết kế, không phải ý kiến pháp lí hoặc chính sách đã được phê duyệt. Khi cần quyết định pháp lí theo bối cảnh triển khai, chủ dự án phải thẩm định riêng trước khi mở chức năng thu dữ liệu.

## 7. Quy tắc bật chức năng lưu thật

Chỉ báo “đã lưu” khi máy chủ xác nhận; có thông báo mất kết nối/lưu thất bại; không mất bản nháp do retry; chống truy cập chéo tài khoản ở máy chủ; kiểm tra consent theo version chính sách; có quyền hạn cụ thể cho người nghiên cứu; ghi nhận nguồn/version khi xuất. Những yêu cầu này thuộc các giai đoạn tiếp theo, không làm phình Trang 1 thành một ứng dụng giả.
