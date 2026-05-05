## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

# Câu A1 (5đ) — 3 Cách nhúng CSS

## 1. Inline CSS

### Ví dụ:

```html
<h1 style="color:red;">Hello</h1>
```

**Ưu điểm:** Nhanh, dễ test  
**Nhược điểm:** Khó bảo trì, dễ rối code  
**Khi dùng:** Chỉnh nhanh một phần tử

## 2. Internal CSS

### Ví dụ:

```html
<head>
  <style>
    h1 {
      color: blue;
    }
  </style>
</head>
```

**Ưu điểm:** Dễ quản lý hơn inline  
**Nhược điểm:** Không tái sử dụng tốt  
**Khi dùng:** Bài tập nhỏ, web đơn giản

## 3. External CSS

### HTML:

```html
<link rel="stylesheet" href="style.css" />
```

### style.css:

```css
h1 {
  color: green;
}
```

**Ưu điểm:** Chuyên nghiệp, dễ bảo trì  
**Nhược điểm:** Phải tạo file riêng  
**Khi dùng:** Dự án thật, website nhiều trang

# Câu hỏi thêm

Nếu cùng một phần tử có cả 3 CSS:
**Thứ tự ưu tiên:**

```text
Inline > Internal > External
```

**Giải thích:**  
CSS hoạt động theo nguyên tắc **Cascade**, style nào gần phần tử HTML hơn thì được ưu tiên hơn.

# Câu A2 (8đ) — CSS Selectors — Dự đoán kết quả

1. h1 → Chọn: "ShopTLU"

2. .price → Chọn: "25.990.000đ", "45.990.000đ"

3. #app header → Chọn: thẻ <header> chứa "ShopTLU, Home, Products, About"

4. nav a:first-child → Chọn: "Home"

5. .product.featured h2 → Chọn: "MacBook Pro"

6. article > p → Chọn:
   "25.990.000đ"
   "Mô tả sản phẩm..."
   "45.990.000đ"
   "Mô tả sản phẩm..."

7. a[href="/"] → Chọn: "Home"

8. .top-bar.dark h1 → Chọn: "ShopTLU"
