# Triển khai P1 — 12/11/2026

Các tài liệu 01–07 giữ nội dung đặc tả của gói thiết kế. Triển khai thực tế nằm ở root workspace, độc lập với gói tham khảo được giải nén lặp. Không thêm framework hoặc cài thư viện runtime.

## Ánh xạ nguồn

| Gói thiết kế | Triển khai |
|---|---|
| prototype/template.html | src/index.template.html |
| prototype/styles.css | src/styles.css |
| prototype/app.js | src/app.js |
| prototype/assets/mark.svg | assets/mark.svg |
| content/copy.vi.json | content/copy.vi.json, giữ nguyên |
| design/tokens.json | design/tokens.json, giữ nguyên |
| tools/build_prototype.py | tools/build_site.py sinh dist/ |
| tools/check_package.py | tools/check_site.py kiểm tra bản dist/ thực tế |

Không cần XEM_NHANH.html trong bản chạy; dist/index.html và tài nguyên tương đối mở được bằng file hoặc HTTP. Những hướng dẫn build prototype trong tài liệu gốc áp dụng cho gói tham khảo; với bản triển khai dùng README ở root.

## Thay đổi cần thiết

- Tách nguồn và thư mục công khai. Máy chủ cục bộ không phục vụ docs, JSON nguồn, Git hoặc thư mục khác. Route chưa có trả 404.
- Giữ copy, thứ tự DOM, thiết kế và hành vi progressive enhancement của prototype.
- Sửa focus khi thu qua 1024px: Chromium có thể blur link đã bị CSS ẩn trước khi callback matchMedia chạy. Ghi nhận focus trong navigation, chuyển về nút khi vùng đó bị thu gọn; focus vào vùng khác sẽ xóa dấu ghi nhận.
- Anchor có modifier (Ctrl/Shift/Alt/Meta) giữ hành vi native; xử lí focus chỉ cho kích hoạt bình thường.
- Thêm bộ kiểm tra bản sinh ra, QA Chrome qua cổng cục bộ, server preview giới hạn loopback và cấu hình static Vercel. Không thêm tương tác sản phẩm ngoài yêu cầu.

## Phạm vi giữ nguyên

Chỉ landing `/`, menu và details dữ liệu native. Transcript ba lượt tĩnh, minh họa Bước 3/9. Không backend/login/chat/API/upload/hồ sơ, không storage/tracking hoặc dịch vụ bên thứ ba. Các trang tương lai chỉ là văn bản “Dự kiến”.

## Phát hành được xác nhận

Landing đã được cho phép xuất bản và deploy lên `https://modellab-ai.vercel.app`, mã nguồn tại `https://github.com/Hieucaohd/ai_tutor`. Quyết định này thay giới hạn chỉ bàn giao cục bộ của tài liệu gốc 01–07 đối với Trang 1; không mở rộng phạm vi sản phẩm. `qa/deployment-results.json` ghi kiểm tra HTTPS sau phát hành. Không đưa `.vercel/`, `.env*`, ZIP hoặc tài liệu nguồn vào nội dung công khai của website.
