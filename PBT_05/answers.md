# PHẦN A — KIỂM TRA ĐỌC HIỂU TLTK : tuan_3_css_advanced/13_creating_responsive_layouts.md → 16_sass_scss.md

## Câu A1 — Viewport & Mobile-First

## 1. Thẻ `<meta viewport>` chuẩn

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Giải thích :
`name="viewport"` : Khai báo đây là thẻ cấu hình vùng hiển thị
`content=""` : Chứa các giá trị cấu hình bên trong
`width=device-width` : Chiều rộng trang = chiều rộng màn hình thiết bị, không bị co giãn
`initial-scale=1.0` : Tỉ lệ zoom ban đầu là 100%, không phóng to/thu nhỏ khi mới mở trang

## 2. Nếu THIẾU thẻ này, iPhone hiển thị như thế nào?

Thiếu dòng này: iPhone giả định trang rộng 980px (như desktop) → thu nhỏ lại → chữ bé xíu → UX tệ.

Có dòng này: iPhone dùng chiều rộng thật của màn hình (375px) → chữ đúng kích thước → readable.

## 3. Mobile-First vs Desktop-First

### Mobile-First

```css
/* Mặc định: mobile */
.container {
  font-size: 14px;
  padding: 10px;
}

/* Khi màn hình >= 768px thì override lên */
@media (min-width: 768px) {
  .container {
    font-size: 16px;
    padding: 30px;
  }
}
```

### Desktop-First

```css
/* Mặc định: desktop */
.container {
  font-size: 16px;
  padding: 30px;
}

/* Khi màn hình <= 768px thì override xuống */
@media (max-width: 768px) {
  .container {
    font-size: 14px;
    padding: 10px;
  }
}
```

### Tại sao Mobile-First được khuyên dùng?

1. **Thực tế người dùng** — hơn 60% traffic web hiện nay đến từ điện thoại, ưu tiên mobile là đúng hướng.
2. **Hiệu năng tốt hơn** — điện thoại chỉ tải CSS cần thiết. Desktop-First thì điện thoại phải tải cả CSS desktop rồi mới override lại, tốn băng thông hơn.
3. **Tư duy đơn giản hơn** — bắt đầu từ đơn giản (mobile) rồi thêm dần lên phức tạp (desktop), dễ kiểm soát hơn là làm ngược lại.
