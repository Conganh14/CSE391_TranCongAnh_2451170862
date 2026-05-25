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
