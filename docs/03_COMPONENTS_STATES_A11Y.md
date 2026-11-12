# Components, states, tương tác và accessibility

## 1. Cây thành phần đề nghị

```text
LandingPage
├── SkipLink
├── SiteHeader
│   ├── BrandMark + BrandName
│   ├── DemoBadge
│   └── LandingNavigation + MobileMenuToggle
├── main#ml-main
│   ├── HeroSection
│   │   ├── HeroCopy + AnchorButton × 2 + DemoNote
│   │   └── ExampleConversation (static)
│   ├── PrinciplesSection → PrincipleCard × 3
│   ├── LearningJourney → JourneyCard × 4
│   ├── CoachOverview → ActivityList
│   └── DataResponsibility → PrivacyDisclosure
└── SiteFooter → FuturePagesList (text only)
```

Tên component để tham khảo khi chuyển sang React; không bắt buộc cài React cho prototype. Nội dung tĩnh nên render phía máy chủ/build hoặc có sẵn trong HTML. Không dùng `dangerouslySetInnerHTML` cho copy.

## 2. Hợp đồng thành phần

| Thành phần | Dữ liệu/props khi chuyển framework | Ngữ nghĩa và điều kiện |
|---|---|---|
| Brand | tên, anchor `#ml-top` | `<a>` có accessible name chứa ModelLab AI; M trang trí aria-hidden |
| DemoBadge | text | `<span>`, không nút, không role=status vì không thay đổi |
| Navigation | label, anchors | `<nav aria-label="Điều hướng chính">`; link dùng href thật |
| MobileMenuToggle | open, controlledId | `<button type="button" aria-expanded aria-controls>`; chữ mở/đóng được cập nhật |
| AnchorButton | label, href, variant | `<a>` vì chuyển vị trí; có mũi tên aria-hidden; không nested button |
| ExampleConversation | heading, step, messages, disclaimer | `<aside aria-labelledby>`; transcript `<ol>`; nhãn người nói hiển thị; không live region |
| Progress | step=3, total=9 | Thanh 9 đoạn aria-hidden; văn bản Bước 3/9 hiển thị. Không giả tiến trình cá nhân |
| PrincipleCard | icon, title, body, optional badge | `<article>` + H3. Không tabindex, cursor:pointer, click hoặc hover nâng thẻ |
| JourneyCard | number, title, body | `<li>` trong `<ol>`; H3 tên giai đoạn; số trang trí không tạo heading |
| ActivityList | bốn mục | `<ol>`; không nút “Chạy Coach 7” |
| PrivacyDisclosure | summary, nội dung | `<details><summary>` native; đóng mặc định; nội dung nằm trong HTML |
| FuturePagesList | labels | Danh sách văn bản với “Dự kiến”; không `<a href="#">`, không nút disabled vô nghĩa |

## 3. Trạng thái và hành vi cụ thể

| Control | Default | Hover | Focus-visible | Active / expanded | Disabled / loading / error |
|---|---|---|---|---|---|
| CTA chính | nền teal, chữ trắng | nền #1B5963 | outline navy 3px + offset 3px | nền #164A53 lúc nhấn | Không áp dụng P1 |
| CTA phụ | trắng, navy, viền control | nền #EDF5F4 | cùng outline | nền #E0ECEB | Không áp dụng P1 |
| Nav link | chữ muted | teal + underline | outline và underline | native anchor | Không gọi “đang đăng nhập” |
| Menu | viền rõ, text “Mở điều hướng” | nền nhạt | outline navy | “Đóng điều hướng”, aria-expanded=true | Không API/loading |
| Privacy summary | text teal + marker native | underline | outline navy | nội dung mở trong luồng, không overlay | Không lỗi tải vì có sẵn HTML |
| Thẻ thông tin | thẻ trắng | không đổi trạng thái điều khiển | không focus | không click | Không áp dụng |
| Transcript | tĩnh | không có | không focus từng bubble | không auto-scroll/gõ chữ | Không giả trạng thái trả lời |

“Không áp dụng” là quyết định có chủ ý. Không tự thêm spinner, toast, skeleton, form email hay hộp chat để lấp các state không tồn tại ở Trang 1.

## 4. Menu responsive

- Ngưỡng desktop ≥1024px: ba nav link hiện, nút menu ẩn, không đặt bẫy focus.
- <1024px khi JS chạy: menu đóng mặc định; nút hiện; link ẩn bằng `display:none`, không còn trong tab order.
- Enter/Space trên nút: đảo trạng thái. Khi mở, focus vẫn ở nút; Tab tiếp theo tới link đầu. Không dùng `role=menu`/menuitem vì đây là điều hướng website thông thường.
- Nhấn một link: đóng menu rồi cuộn tới anchor; đặt focus vào đích để người dùng bàn phím tiếp tục từ nội dung vừa tới. Chỉ thực hiện khi JS đang hoạt động.
- Escape khi focus trong header: đóng menu, trả focus về nút.
- Khi đổi từ mobile sang desktop: hiển thị nav, reset expanded=false. Khi trở lại mobile: đóng; nếu focus đang nằm trong link bị ẩn, chuyển về nút.
- Không dùng document click handler để đóng ngoài menu; đây là vùng nằm trong luồng, không cần click-outside/modal.
- Nếu JS tắt: nút menu không hiện, các nav link hiện và wrap được. Toàn bộ copy/anchor/details vẫn dùng được.

## 5. Anchor và focus

Logo/Giới thiệu → `#ml-top`; hero CTA1/Coach CTA → `#ml-steps`; hero CTA2/nav Coach → `#ml-coach`; skip link → `#ml-main`. ID `ml-features`, `ml-trust` được giữ ổn định để tích hợp liên kết sau này.

Prototype đặt `tabindex=-1` cho đích để JS chuyển focus. Không đưa heading vào thứ tự Tab thông thường. Native href vẫn hoạt động khi JS tắt. Browser Back/Forward phải khôi phục hash bình thường. Với reduced motion, `scroll-behavior:auto`; không `preventDefault` toàn bộ anchor để tự tạo router.

## 6. Accessibility — mục tiêu WCAG 2.2 AA

Đối chiếu chuẩn: [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Đây là mục tiêu thiết kế; không phải xác nhận đã kiểm định đầy đủ.

- `lang="vi"`, UTF-8, viewport `width=device-width, initial-scale=1`; không chặn zoom.
- Một H1; các khu vực chính H2; thẻ H3. Một `<main>`, header/footer semantic, nhãn nav rõ.
- Skip link xuất hiện khi focus, target ở đầu main. Không sticky header che target.
- Tương phản chữ thường tối thiểu 4.5:1; chữ lớn 3:1. Biên/đánh dấu điều khiển quan trọng tối thiểu 3:1 khi tiêu chí áp dụng. Bảng màu thực tế được kiểm tra trong `tools/check_package.py`.
- Focus luôn rõ: outline 3px, không xóa outline nếu không thay thế. Target thiết kế tối thiểu 44×44px, cao hơn ngưỡng tối thiểu cơ bản của chuẩn; không tuyên bố 44px là mọi yêu cầu AA.
- Không dùng màu đơn độc diễn đạt vai trò/lỗi/trạng thái. Mỗi lượt chat có nhãn AI/HỌC SINH; badge có chữ “Dự kiến”.
- SVG trang trí aria-hidden và focusable=false; icon không chứa thông tin duy nhất. Không dùng emoji làm ký hiệu bảo vệ dữ liệu.
- Không thông báo transcript như hội thoại trực tiếp. Không aria-live khiến trình đọc màn hình đọc lại ba lượt tĩnh.
- Reflow từ 320 CSS px; zoom 200%/400%; tăng khoảng cách chữ không mất nội dung. Không chiều cao khóa hoặc line-clamp body.
- Details sử dụng thao tác native; người dùng có thể mở/đóng bằng bàn phím. Menu thông báo trạng thái expanded. Không trap focus.

## 7. Các việc kiểm tra thủ công trước phát hành thật

Duyệt bằng Tab/Shift+Tab, Enter, Space, Escape; xác minh focus sau anchor. Đọc bằng NVDA hoặc VoiceOver với tiếng Việt; kiểm tra tên, heading, thứ tự transcript và trạng thái details/menu. Kiểm tra high contrast/forced colors, zoom 200%/400%, text spacing. Xem báo cáo QA để biết việc nào đã làm thực tế. Không đổi “chưa kiểm tra” thành “đạt” bằng suy luận từ HTML.
