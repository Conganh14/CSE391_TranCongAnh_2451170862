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
