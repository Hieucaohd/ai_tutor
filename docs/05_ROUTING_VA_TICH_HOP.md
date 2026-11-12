# Routing và kiến trúc tích hợp tương lai

**Chỉ `/` được triển khai trong gói này.** Các route bên dưới là hợp đồng đề xuất cho giai đoạn tiếp theo, không chứng minh đã có chức năng.

## 1. Bảng route

| Route đề nghị | Trạng thái P1 | Truy cập tương lai | Nội dung |
|---|---|---|---|
| `/` | Landing có trong prototype | Công khai | Giới thiệu và anchor |
| `/huong-dan` | Dự kiến | Công khai, không bắt đăng nhập chỉ để đọc | Thư viện Coach 7 theo 9 bước |
| `/huong-dan/buoc-1` … `/buoc-9` | Dự kiến dưới `/huong-dan/` | Công khai | Mục tiêu, thao tác, lỗi, minh chứng, tự kiểm tra |
| `/tro-giang` | Dự kiến | Học sinh đã xác thực, quyền và đồng ý phù hợp | Nhiệm vụ + tiến trình + hội thoại |
| `/ho-so` | Dự kiến | Chủ sở hữu hồ sơ | Phiên học và minh chứng của mình |
| `/dang-nhap` | Dự kiến | Khách | Xác thực tài khoản riêng của website |
| `/quyen-rieng-tu` | Dự kiến | Công khai | Thông báo chính thức đã được phê duyệt |
| `/quan-tri` | Dự kiến, không xuất hiện trên landing | Vai trò được cấp quyền | Nhiệm vụ, quyền, rubric, xuất nghiên cứu |

Không tạo link tới route chưa có. Nếu dự án đã có router, giữ quy ước của dự án, lập bảng ánh xạ tương đương. Trong prototype HTML mở qua `file://`, chỉ dùng anchor; không yêu cầu một SPA router giả.

## 2. Cấu trúc dự án đề nghị nếu chưa có framework

```text
public/                   # tài sản công khai, không secrets
src/
  pages/LandingPage        # Trang 1, triển khai hiện tại
  components/landing/      # Hero, Principles, Journey, Coach, Trust
  components/shared/      # Brand, Header, Footer, ButtonLink
  content/landing.vi.json
  styles/tokens.css
  features/guide/          # tạo sau, chưa có implementation
  features/tutor/          # tạo sau
  features/auth/           # tạo sau
  features/portfolio/      # tạo sau
server/                   # chỉ tạo khi bắt đầu backend thật
  auth/ permissions/ tutor/ portfolio/ audit/
```

Đây là sơ đồ định hướng, không phải yêu cầu tạo thư mục rỗng hàng loạt. Nếu dự án dùng React/Next/Vue, dùng cấu trúc đang có. Đặt tokens dưới namespace `--ml-` hoặc module để tránh ảnh hưởng ứng dụng hiện tại. Không áp `body`, `h1`, `button` toàn cục vào dự án khác mà chưa giới hạn phạm vi.

## 3. Ranh giới kiến trúc

```text
Trang 1 công khai ── nội dung tĩnh, anchor

Giai đoạn tương lai:
Trình duyệt học sinh
  ├─ Hướng dẫn (đọc)
  └─ Auth + giao diện trợ giảng/hồ sơ
       ↓ HTTPS, phiên học sinh đã xác thực
Máy chủ ứng dụng
  ├─ Xác thực + quyền trên từng phiên/tệp
  ├─ Chính sách sư phạm + kho hướng dẫn đã duyệt
  ├─ Dịch vụ gọi mô hình AI → OpenAI API
  └─ Kho hồ sơ + kho tệp + nhật kí kiểm toán
```

Website không mặc nhiên đọc màn hình, điều khiển hoặc đồng bộ trực tiếp Coach 7. Dữ liệu Coach 7/ảnh/đồ thị tương lai chỉ được nhận qua luồng minh chứng chủ động đã thiết kế và được cấp quyền. Không nhúng đăng nhập ChatGPT cá nhân vào trang học sinh. Không sử dụng cookie/session ChatGPT cá nhân làm thông tin xác thực của nhiều học sinh.

Khóa API được nạp ở máy chủ từ biến môi trường hoặc kho bí mật, không nằm trong bundle trình duyệt. Cách bảo vệ khóa này theo [OpenAI API Overview — Authentication](https://developers.openai.com/api/reference/overview). Cần chọn và kiểm tra cách cấp quyền, hạn mức, chi phí và xử lí dữ liệu của tài khoản API ở giai đoạn tích hợp; gói này không kiểm tra tài khoản hoặc quyền API của chủ dự án và không cam kết gói ChatGPT đã bao gồm API.

## 4. Hợp đồng trạng thái trước khi bật link thật

Đề nghị dùng cấu hình máy chủ/build, không nút bí mật trên landing:

```json
{
  "guideReady": false,
  "authReady": false,
  "tutorReady": false,
  "portfolioReady": false
}
```

Trong P1 tất cả đều false. Prototype không cần đọc cấu hình này. Khi tích hợp thật, capability của tutor chỉ khả dụng nếu auth, chính sách, quyền, backend và kiểm thử tương ứng đều sẵn sàng. Cờ giao diện không thay thế kiểm tra quyền trên máy chủ.

Ví dụ điều hướng tương lai: khi `/tro-giang` đã được bật, khách tới route này có thể được chuyển tới `/dang-nhap?next=/tro-giang`; `next` chỉ nhận đường dẫn nội bộ trong allowlist, không chuyển tới URL tùy ý. Người đã xác thực nhưng thiếu quyền nhận thông báo phù hợp; không để frontend tự suy ra role từ email.

## 5. Dữ liệu/hợp đồng API sơ bộ — không triển khai ở P1

| API đề xuất | Trách nhiệm |
|---|---|
| `GET /api/me` | Xác định phiên và quyền học sinh hiện tại |
| `POST /api/learning-sessions` | Tạo phiên theo nhiệm vụ được phép |
| `POST /api/learning-sessions/:id/messages` | Kiểm tra quyền/đồng ý, xử lí lượt trợ giảng, lưu trạng thái bền vững |
| `GET /api/learning-sessions/:id` | Chỉ đọc phiên thuộc phạm vi quyền |
| `POST /api/evidence` | Tải minh chứng theo giới hạn định dạng/dung lượng và quyền |
| `GET /api/portfolio/export` | Xuất dữ liệu của người dùng theo chính sách |
| `POST /api/data-requests` | Tiếp nhận yêu cầu xử lí/xóa, có quy trình xác minh |

Tên API là phương án thiết kế. Chưa cố định framework, schema production hay nhà cung cấp xác thực. Một lượt chat tương lai cần tách `pending`, `sent`, `failed`, `saved`, `save_failed`; chỉ báo “đã lưu” sau xác nhận lưu bền vững. Có khóa idempotency để retry không tạo bản sao. Không ghi toàn bộ hội thoại nhạy cảm vào log lỗi hạ tầng.

## 6. Nội dung Trang 2 và Trang 3 sẽ nối tiếp thế nào?

- Trang 2: giữ 9 bước như tài liệu sư phạm; mỗi bước có mã ổn định 1–9, mục tiêu, thao tác Coach 7 theo phiên bản, lỗi phổ biến, minh chứng và câu hỏi tự kiểm tra. Kiểm tra ảnh/lệnh trên phiên bản Coach thực tế trước khi xuất bản.
- Trang 3: desktop có cột tiến trình, cột hội thoại, cột nhiệm vụ/minh chứng; mobile đổi sang các vùng dễ tiếp cận. Định nghĩa riêng empty/loading/error/offline/refusal/consent-required. Không suy diễn các state này thành chức năng của Trang 1.
- Hồ sơ: gắn bản ghi với ID học sinh của hệ thống và quyền máy chủ, không gắn với máy tính đang mở hoặc email quản trị.
- Quản trị: không link công khai trên Trang 1; không dùng việc giấu link để thay xác thực/phân quyền.

## 7. Thứ tự triển khai được khuyến nghị

Hoàn thiện P1 → thẩm định nội dung hướng dẫn → chốt chính sách và mô hình tài khoản → triển khai auth/quyền → API tutor và kiểm thử sư phạm → lưu hồ sơ/quyền xuất-xóa → thử nghiệm nhỏ có giám sát. Đây là thứ tự phụ thuộc, không phải cam kết lịch. Chỉ mở rộng theo yêu cầu tiếp theo của chủ dự án.
