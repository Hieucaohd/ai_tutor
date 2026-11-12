# Đặc tả UI responsive

## 1. Hướng thị giác

Học thuật, sáng, yên tĩnh, dễ đọc. Giữ nhận diện mockup gốc: nền nhạt, chữ navy, CTA teal, thẻ trắng bo góc, một bảng transcript minh họa ở hero. Không dùng ảnh kho, hình robot, số liệu thành tích, hiệu ứng gõ chữ, chuyển động trang trí hoặc logo OpenAI. Chữ M là ký hiệu ModelLab AI, không phải logo Coach 7.

## 2. Lưới và kích thước

Đơn vị dưới đây là CSS px tại zoom 100%. Nội dung có `max-width:1160px`, căn giữa. Padding ngang 20px cho <768; 32px cho ≥768. Màn hình 320px còn 280px nội dung; 390px còn 350px; 768px còn 704px; 1024px còn 960px; 1440px giới hạn 1160px. Không đặt chiều cao cố định cho khối có chữ.

| Khoảng rộng | Header | Hero | Giá trị | Quy trình | Coach |
|---|---|---|---|---|---|
| 320–479 | Logo + badge; nút Menu và liên kết phía dưới | 1 cột; chữ trước transcript | 1 cột | 1 cột | 1 cột |
| 480–767 | Như mobile | 1 cột | 1 cột | 2 cột | 1 cột |
| 768–1023 | Logo + badge; menu thu gọn | 1 cột; transcript không quá 620px | 3 cột | 2 cột | 2 cột |
| ≥1024 | Logo trái; nav giữa; badge phải | 1.12fr / .88fr; gap 40px | 3 cột | 4 cột | 1fr / 1fr; gap 40px |

Tại 1024px, các cột được phép xuống chữ tự nhiên. Không thu nhỏ font để ép vào một hàng. Bốn giai đoạn hiển thị theo thứ tự 01→04 trong DOM và thị giác; không dùng CSS đảo thứ tự.

## 3. Kích thước từng khu vực

- **Header:** nền trắng, border dưới, không sticky. Container min-height 88px trên desktop; padding dọc 16px. Logo vuông 40px, radius 12px; tên 21px, weight 800. Nav gap 24px. Badge 13px, padding 6px 10px, radius 8px. Mobile không để badge đè logo: cụm logo/badge có wrap.
- **Hero:** gradient `125deg #EEF8F7 → #F8FAFB 72%`; padding dọc 72px desktop, 48px mobile. Gap 40px desktop/32px mobile. H1 tối đa khoảng 650px, một ngắt dòng có chủ ý giữa hai vế; mỗi vế vẫn tự xuống dòng được. Lead max-width 56ch, cách H1 20px. CTA gap 12px, margin trên 28px. Mobile <480 CTA rộng 100%.
- **Transcript:** nền trắng, border 1px `#D5E2E3`, radius 20px, padding 24px desktop/20px mobile, shadow nhẹ. Đầu transcript wrap được. Thanh 9 đoạn gap 5px, cao 6px. Bubble padding 14px 16px, radius 12px; AI lùi phải 20px; học sinh lùi trái 28px; mobile lùi 12px/16px. Bubble không có avatar ảnh thật.
- **Giá trị:** padding dọc 64px/44px; intro max-width 720px căn giữa; cách grid 32px. Grid gap 20px. Thẻ padding 24px/20px; icon 40px; title 18px. Thẻ là nội dung, không hover nổi như nút.
- **Quy trình:** nền `#EAF2F2`; padding như section. Grid gap 16px; thẻ trắng radius 16px, padding 24px/20px. Số 28px weight 800, không dùng làm heading riêng. Chú thích tổng quan hiển thị dưới intro.
- **Coach:** padding dọc 64px/44px. Panel navy, chữ trắng, radius 20px, padding 28px/24px; dòng border alpha trắng. Số accent `#8DD5D0`; tên hoạt động 16px, line-height 1.6.
- **Dữ liệu:** nền `#E9F3F1`, border trên, padding dọc 36px. Biểu tượng khiên SVG nội tuyến, 28px. Tóm tắt và details nằm trong cột văn bản; không tạo một modal che trang.
- **Footer:** nền navy, chữ `#D0E1E2`, padding dọc 28px; hai cụm đầu chia trái/phải desktop, xếp dọc mobile. Danh sách trang dự kiến ở dòng dưới, có nhãn trạng thái.

## 4. Tokens

`design/tokens.json` là nguồn giá trị, `prototype/styles.css` ánh xạ sang custom properties `--ml-*`.

| Token | Giá trị | Vai trò |
|---|---|---|
| color.navy | #183C48 | H1/H2/H3, footer, panel |
| color.teal | #226D78 | CTA, nhấn H1, liên kết, nhãn |
| color.textMuted | #526971 | Body phụ; không giảm opacity |
| color.bg | #F6F9F9 | Nền chung |
| color.surface | #FFFFFF | Header, card, transcript |
| color.border | #D5E2E3 | Ranh giới trang trí; không thay focus |
| color.controlBorder | #647D83 | Viền nút phụ/menu bảo đảm dễ nhận diện |
| color.focus | #183C48 | Outline focus trên nền sáng |
| color.focusInverse | #8DD5D0 | Focus nếu về sau có nút trên nền navy |
| color.aiBubble | #EDF5F4 | Lượt AI |
| color.studentBubble | #E8EEF6 | Lượt học sinh |

Spacing scale: 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 64, 72. Radius: 8 (badge), 12 (button/bubble), 16 (card), 20 (panel). Không thêm màu đỏ/xanh lá để giả trạng thái kết nối.

## 5. Typography

Font local: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`. Không phụ thuộc tải Google Fonts; kiểm tra đầy đủ dấu tiếng Việt.

| Cấp | Cỡ/line-height | Weight | Quy tắc |
|---|---|---|---|
| H1 | clamp(32px, 3.5vw, 48px) / 1.2 | 800 | letter-spacing -0.03em; từ không tràn cột |
| H2 | clamp(26px, 2.5vw, 34px) / 1.3 | 750 | cách body 12px |
| H3 | 18px / 1.45 | 700 | Không viết toàn bộ chữ hoa |
| Lead | 17px / 1.8 | 400 | mobile không dưới 16px |
| Body/card | 16px / 1.75 | 400 | Căn trái; intro được căn giữa |
| Button/nav | 15px / 1.5 | 650–700 | target tối thiểu 44px |
| Eyebrow | 12px / 1.6 | 800 | tracking .1em, ngắn |
| Metadata | 13px / 1.6 | 500 | tương phản đủ; không dùng cho nội dung chính |

## 6. Wireframe và giới hạn khác biệt

Xem `design/BO_CUC.svg`. Sơ đồ là bản bố cục, không phải screenshot. Prototype là mẫu thị giác chi tiết. Trình duyệt/OS khác nhau được phép khác xuống dòng nhẹ; không được khác thứ tự, nội dung, màu thương hiệu, ý nghĩa trạng thái hoặc khả năng bấm. Các ảnh QA nếu có trong `qa/screenshots/` là quan sát thực tế, không thay spec.

## 7. Responsive edge cases

Không dùng `overflow-x:hidden` để che lỗi. Grid con luôn `min-width:0`; nội dung dài được xuống dòng. Badge không ép nowrap toàn header. Đặt `overflow-wrap:anywhere` cho văn bản/tên tương lai nếu cần. Không dùng absolute positioning cho body. Không khóa portrait. Zoom 200%/400% phải còn đọc được; tương tác giữ nguyên. Với `prefers-reduced-motion:reduce`, cuộn tức thời; không animation khác.
