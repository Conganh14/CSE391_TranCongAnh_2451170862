# PHẦN A — ĐỌC HIỂU

## Câu A1 — Grid System

| Kích thước | < 768px      | 768px - 991px | ≥ 992px      |
| ---------- | ------------ | ------------- | ------------ |
| Số cột     | 12 (col-12)  | 6 (col-md-6)  | 3 (col-lg-3) |
| Box layout | 1 box / hàng | 2 box / hàng  | 4 box / hàng |

### 1. Mobile — < 768px (col-12)

```
+---------------------------+
|          Box 1            |
+---------------------------+
|          Box 2            |
+---------------------------+
|          Box 3            |
+---------------------------+
|          Box 4            |
+---------------------------+
```

### 2. Tablet — 768px đến 991px (col-md-6)

```
+-------------+-------------+
|    Box 1    |    Box 2    |
+-------------+-------------+
|    Box 3    |    Box 4    |
+-------------+-------------+
```

### 3. Desktop — ≥ 992px (col-lg-3)

```
+------+------+------+------+
| Box1 | Box2 | Box3 | Box4 |
+------+------+------+------+
```

## Câu hỏi thêm

### `col-md-6` nghĩa là gì?

- `md` = breakpoint **medium**, áp dụng khi màn hình **≥ 768px**
- `6` = chiếm **6 trên 12 cột** = **50% chiều rộng** của hàng
- → Mỗi hàng chứa được **2 box** (vì 6 + 6 = 12)

### Tại sao không cần viết `col-sm-12`?

Bootstrap sử dụng triết lý **mobile-first**: các class được áp dụng từ kích thước nhỏ lên lớn.

- `col-12` đã tự động áp dụng cho **mọi kích thước** (kể cả sm) khi không có class nào ghi đè.
- Khi màn hình đạt breakpoint `md` (≥ 768px), `col-md-6` mới ghi đè lên.
- Vì vậy, viết thêm `col-sm-12` là **thừa** — Bootstrap đã xử lý mặc định rồi.

## Câu A2 — Utilities & Components

1.

- `d-none`: Ẩn element ở mọi kích thước màn hình.
- `d-md-block`: Hiển thị element dưới dạng `block` khi màn hình từ `md` trở lên.

### Kết luận

- Màn hình nhỏ hơn `768px` (`md`)  
  → Element bị ẩn.
- Màn hình từ `768px` trở lên  
  → Element hiển thị dạng `block`.

2.

### `mt-3`

- `m` = margin
- `t` = top
- `3` = mức khoảng cách

→ Tạo margin phía trên.

### `mb-auto`

- `m` = margin
- `b` = bottom
- `auto` = tự động

→ Margin-bottom tự động.

### `px-4`

- `p` = padding
- `x` = left + right
- `4` = mức khoảng cách

→ Tạo padding trái và phải.

### `py-2`

- `p` = padding
- `y` = top + bottom
- `2` = mức khoảng cách

→ Tạo padding trên và dưới.

### `ms-5`

- `m` = margin
- `s` = start
- `5` = mức khoảng cách

→ Tạo margin bên trái.

3.

### `.container`

- Có chiều rộng cố định theo từng breakpoint.
- Tự căn giữa màn hình.

### `.container-fluid`

- Chiếm toàn bộ chiều rộng màn hình (`width: 100%`).

### `.container-md`

- Nhỏ hơn `md`: full width.
- Từ `md` trở lên: giống `.container`.

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tùy biến Bootstrap

1. Quy trình đổi màu $primary sang #E63946

# Cần công cụ:

- Bootstrap source có Sass.
- Trình biên dịch Sass: dart-sass, sass, hoặc node-sass.

# File cần chỉnh :

Tạo file custom custom.scss hoặc sửa file \_variables.scss trước khi import Bootstrap.

# Sau đó biên dịch custom.scss thành CSS

# Kết quả:

- custom.css chứa Bootstrap với màu chính mới.
- Dùng custom.css thay cho Bootstrap mặc định.

2. Tại sao không nên override trực tiếp .btn-primary { background: red; }

# Vì .btn-primary chỉ là một component riêng lẻ.

- Bootstrap dùng $primary để tạo nhiều thành phần khác nhau: button, link, badge, gradient, border, hover state, v.v.
- Nếu chỉ override .btn-primary, màu primary ở các component khác vẫn không đổi.

# Dùng Sass variable giúp:

- thay đổi màu toàn cục nhất quán.
- giữ nguyên tính nhất quán thiết kế và theme.
- dễ bảo trì khi muốn đổi lại sau này.

# Override CSS trực tiếp có nhược điểm:

- dễ gây xung đột specificity.
- phải viết lại nhiều selector nếu muốn thay đổi nhiều thành phần.
  khó cập nhật khi Bootstrap upgrade.

# Kết luận:

- Nên dùng $primary vì đây là cách tùy biến chủ đạo của Bootstrap, vừa sạch sẽ vừa an toàn hơn.

## Câu C2 — So sánh

1. Số dòng CSS cần viết

- CSS thuần: thường cần khoảng 20-40 dòng cho 1 navbar và 15-25 dòng cho 1 card, tổng khoảng 35-65 dòng CSS.
- Bootstrap: gần như không cần viết CSS vì chỉ cần sử dụng các class có sẵn trực tiếp trên HTML.

2. Thời gian phát triển

- CSS thuần: mất nhiều thời gian hơn vì phải tự thiết kế layout, responsive breakpoint và style riêng.
- Bootstrap: phát triển nhanh hơn nhiều nếu chỉ cần layout chuẩn và các component phổ biến.

3. Khả năng tùy biến

- CSS thuần: dễ tùy biến mọi chi tiết nhưng phải viết toàn bộ bằng tay.
- Bootstrap: dễ tùy biến bằng utility classes và SASS variables, tuy nhiên nếu muốn giao diện hoàn toàn khác biệt thì vẫn cần viết thêm CSS hoặc override.

Bootstrap phù hợp với các dự án cần giao diện đồng nhất và phát triển nhanh, còn CSS thuần linh hoạt hơn cho các thiết kế độc đáo.

4. Khi nào NÊN dùng Bootstrap?

- Dự án prototype, MVP, admin dashboard, landing page cần hoàn thành nhanh.
- Khi team cần giao diện đồng nhất và không muốn viết quá nhiều CSS.
- Khi muốn tận dụng sẵn các component như:
  - Navbar
  - Card
  - Modal
  - Form
  - Table
  - Alert

5. Khi nào KHÔNG NÊN dùng Bootstrap?

- Khi dự án cần thiết kế cá nhân hóa cao và khác biệt nhiều so với giao diện mặc định.
- Khi muốn tối ưu hiệu năng tối đa cho website nhỏ và không cần cả framework lớn.
- Khi dự án chỉ có vài component đơn giản và viết CSS thuần sẽ nhanh hơn.
