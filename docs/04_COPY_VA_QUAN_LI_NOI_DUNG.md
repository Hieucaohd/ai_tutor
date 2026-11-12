# Nội dung tiếng Việt chính thức — v1.0

Nguồn duy nhất của câu chữ triển khai: `content/copy.vi.json`. Phần dưới được sinh từ JSON để đọc/copy thuận tiện. Mỗi ID là một đơn vị nội dung. Giữ nguyên dấu, thuật ngữ, sắc thái dự kiến và nhãn minh họa. Không rút gọn thông báo dữ liệu để tạo chỗ cho giao diện.

Copy hero, transcript, ba giá trị, bốn giai đoạn và Coach giữ từ mockup gốc. Gói bổ sung nhãn trạng thái, giới hạn đọc màn hình, thông tin dữ liệu dự kiến và các trang tương lai. Xem tài liệu 07 để đối chiếu thay đổi.

Không chép email quản trị vào bất kì copy công khai nào. Các nhãn aria thuần kỹ thuật trong HTML cũng phải dùng tiếng Việt. Mũi tên, số mục Coach và chữ M là trang trí; không cần dịch. Nhãn “Điều hướng chính”, “Hoạt động trên Coach 7” là nhãn hỗ trợ tiếp cận, không phải lời quảng bá.

Khi thay đổi: sửa JSON → chạy `python tools/build_prototype.py` → kiểm tra `python tools/check_package.py` → xem lại responsive. CSS và app.js không sinh từ JSON. Tokens JSON là hợp đồng thiết kế, cập nhật CSS cùng lúc nếu đổi tokens. Không sửa riêng HTML sinh ra rồi để JSON cũ.

Không tạo mới nội dung khi chuyển framework. Các ID có thể trở thành props hoặc khóa i18n; nội dung vẫn render tĩnh. Với menu, dùng `menu.open` và `menu.close` để cập nhật text khi expanded thay đổi.

## Copy theo ID

### `meta.title`

ModelLab AI – Trợ giảng mô hình hóa Vật lí

### `meta.description`

Tự xây dựng, thực thi và kiểm nghiệm mô hình Vật lí bằng Coach 7. Khám phá thiết kế ModelLab AI: AI đồng hành, không làm thay.

### `a11y.skip`

Chuyển đến nội dung chính

### `brand.name`

ModelLab

### `brand.ai`

AI

### `nav.about`

Giới thiệu

### `nav.coach`

Coach 7

### `nav.journey`

Quy trình học

### `nav.status`

Bản thiết kế demo

### `menu.open`

Mở điều hướng

### `menu.close`

Đóng điều hướng

### `hero.eyebrow`

AI TRỢ GIẢNG · MÔ HÌNH HÓA VẬT LÍ

### `hero.title.first`

Tự xây dựng mô hình.

### `hero.title.second`

AI đồng hành, không làm thay.

### `hero.lead`

Khám phá Vật lí thông qua việc tự xây dựng, thực thi và kiểm nghiệm mô hình bằng Coach 7. AI trợ giảng sẽ đặt câu hỏi, gợi mở và hỗ trợ em vượt qua khó khăn theo từng bước.

### `hero.cta.primary`

Khám phá cách học

### `hero.cta.secondary`

Tìm hiểu Coach 7

### `hero.note`

Đây là trang giới thiệu mẫu. Đăng nhập, trò chuyện AI và lưu hồ sơ học tập chưa được triển khai.

### `example.title`

Phiên học tập minh họa

### `example.step`

Bước 3/9

### `example.speaker.ai`

AI TRỢ GIẢNG

### `example.speaker.student`

HỌC SINH

### `example.message.1`

Trước khi xây dựng mô hình, em nghĩ những đại lượng nào thay đổi theo thời gian?

### `example.message.2`

Em nghĩ vị trí và vận tốc của vật đều thay đổi.

### `example.message.3`

Em hãy thử giải thích mối quan hệ giữa hai đại lượng đó. Sau đó, chúng ta sẽ chọn cách biểu diễn trên Coach 7.

### `example.note`

Ví dụ minh họa · AI chưa kết nối với hệ thống thực

### `principles.title`

Học Vật lí bằng cách tự khám phá

### `principles.intro`

AI không cung cấp sẵn một mô hình để sao chép. Hệ thống hướng đến giúp em hiểu, tự xây dựng và kiểm chứng những lựa chọn của mình.

### `principles.1.title`

Học sinh làm chủ

### `principles.1.body`

Em lựa chọn giả định, xác định đại lượng, thiết lập quan hệ và tự giải thích kết quả.

### `principles.2.title`

Gợi ý đúng lúc

### `principles.2.body`

AI đặt câu hỏi, đưa gợi ý theo mức độ cần thiết và hướng dẫn thao tác khi em gặp khó khăn.

### `principles.3.title`

Lưu hành trình học tập

### `principles.3.badge`

Dự kiến

### `principles.3.body`

Lịch sử trao đổi và sản phẩm học tập dự kiến được lưu theo tài khoản để em theo dõi tiến bộ.

### `journey.title`

Hành trình học tập diễn ra thế nào?

### `journey.intro`

Mỗi nhiệm vụ có các giai đoạn rõ ràng, nhưng em có thể quay lại kiểm tra và sửa mô hình bất cứ khi nào cần.

### `journey.note`

Bốn giai đoạn tổng quan · Quy trình chi tiết 9 bước sẽ được trình bày ở Trang hướng dẫn. AI có thể hỗ trợ ở bất kì bước nào khi em cần.

### `journey.1.number`

01

### `journey.1.title`

Hiểu vấn đề

### `journey.1.body`

Xác định hiện tượng, mục tiêu, giả định và đại lượng.

### `journey.2.number`

02

### `journey.2.title`

Tạo mô hình

### `journey.2.body`

Thiết lập quan hệ và xây dựng mô hình trong Coach 7.

### `journey.3.number`

03

### `journey.3.title`

Nhận hỗ trợ

### `journey.3.body`

Hỏi AI khi gặp khó và tự thực hiện bước tiếp theo.

### `journey.4.number`

04

### `journey.4.title`

Kiểm chứng

### `journey.4.body`

Phân tích đồ thị, so sánh dữ liệu và điều chỉnh mô hình.

### `coach.eyebrow`

MÔI TRƯỜNG THỰC HÀNH

### `coach.title`

Coach 7 là công cụ xây dựng và kiểm nghiệm mô hình

### `coach.body`

Em sẽ thực hiện mô hình hóa trên phần mềm Coach 7. Website hỗ trợ giải thích quy trình và tương tác với AI, nhưng không tự động thay thế các thao tác và quyết định của em trên phần mềm.

### `coach.limit`

Website không tự điều khiển Coach 7 hoặc đọc màn hình của em.

### `coach.cta`

Xem quy trình học

### `coach.activity.1`

Thiết lập mô hình từ quan hệ Vật lí

### `coach.activity.2`

Chạy mô hình và quan sát đồ thị

### `coach.activity.3`

Đối chiếu dữ liệu thực nghiệm

### `coach.activity.4`

Đánh giá và sửa đổi mô hình

### `trust.title`

Học tập có trách nhiệm và bảo vệ dữ liệu

### `trust.body`

Hệ thống dự kiến lưu lịch sử tương tác và minh chứng học tập theo mã tài khoản, trên cơ sở sự đồng ý phù hợp và quyền truy cập được quy định rõ. AI là công cụ hỗ trợ; giáo viên và người nghiên cứu chịu trách nhiệm giám sát, đánh giá.

### `trust.current`

Bản giới thiệu mẫu này chưa thu hoặc lưu hồ sơ học tập và chưa có chức năng đăng nhập.

### `trust.summary`

Tìm hiểu về dữ liệu học tập dự kiến

### `trust.data.title`

Dữ liệu và mục đích

### `trust.data.body`

Dự kiến gồm mã học sinh, nhiệm vụ, hội thoại, tiến trình và minh chứng do em chủ động cung cấp để theo dõi việc học và phục vụ nghiên cứu trong phạm vi đã thông báo.

### `trust.access.title`

Ai được truy cập?

### `trust.access.body`

Học sinh chỉ được xem hồ sơ của mình; giáo viên và người nghiên cứu chỉ truy cập trong phạm vi được cấp quyền.

### `trust.retention.title`

Thời hạn và quyền xử lí dữ liệu

### `trust.retention.body`

Trước khi thu dữ liệu thật, đơn vị triển khai cần công bố thời hạn lưu, cách yêu cầu xem, xuất, sửa hoặc xóa dữ liệu và kênh tiếp nhận yêu cầu.

### `trust.consent.title`

Đồng ý tham gia

### `trust.consent.body`

Việc đồng ý tham gia học tập hoặc nghiên cứu sẽ được thực hiện riêng, với sự tham gia của người giám hộ khi cần. Xem trang giới thiệu không được xem là đồng ý thu dữ liệu.

### `footer.brand`

ModelLab AI · Thiết kế giao diện nghiên cứu v1.0

### `footer.status`

Chưa triển khai đăng nhập, lưu dữ liệu hoặc kết nối AI

### `footer.future.title`

Các trang dự kiến phát triển

### `footer.future.guide`

Hướng dẫn Coach 7 · Dự kiến

### `footer.future.tutor`

AI trợ giảng · Dự kiến

### `footer.future.portfolio`

Hồ sơ học tập · Dự kiến

### `footer.future.login`

Đăng nhập · Dự kiến
