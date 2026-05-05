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

# Câu A3 - Box Model

## Trường hợp 1: `content-box`

```css
width: 400px;
padding: 20px;
border: 5px;
margin: 10px;
```

### Kết quả:

- Chiều rộng hiển thị = **450px**
- Không gian chiếm trên trang = **470px**

## Trường hợp 2: `border-box`

```css
box-sizing: border-box;
width: 400px;
padding: 20px;
border: 5px;
margin: 10px;
```

### Kết quả:

- Chiều rộng hiển thị = **400px**
- Content thực tế = **350px**
- Không gian chiếm trên trang = **420px**

## Trường hợp 3: Margin Collapse

```css
.box-a {
  margin-bottom: 25px;
}
.box-b {
  margin-top: 40px;
}
```

### Kết quả:

Khoảng cách thực tế:

```text
40px
```

### Giải thích:

Margin dọc bị **collapse**, trình duyệt chỉ lấy margin lớn hơn:

```text
max(25, 40) = 40px
```

=> Không phải:

```text
25 + 40 = 65px
```

## Nâng cao

```css
.box-a {
  margin-bottom: -10px;
}
.box-b {
  margin-top: 40px;
}
```

Khoảng cách:

```text
40 + (-10) = 30px
```

### Kết quả:

**30px**

# Câu A4 - Specificity

Element:

```html
<p class="price" id="main-price"></p>
```

---

## 1. Specificity score

### Rule A

```css
p {
  color: black;
}
```

Score:

```text
(0,0,1)
```

---

### Rule B

```css
.price {
  color: blue;
}
```

Score:

```text
(0,1,0)
```

---

### Rule C

```css
#main-price {
  color: red;
}
```

Score:

```text
(1,0,0)
```

---

### Rule D

```css
p.price {
  color: green;
}
```

Score:

```text
(0,1,1)
```

---

## 2. Element sẽ có màu gì?

Kết quả:

```text
Màu đỏ
```

Rule thắng:

```css
#main-price
```

Vì `id` có độ ưu tiên cao nhất.

---

## 3. Nếu thêm inline CSS

```html
<p class="price" id="main-price" style="color: orange;"></p>
```

Kết quả:

```text
Màu cam
```

Vì inline CSS ưu tiên cao hơn CSS thường.

---

## 4. Nếu Rule A thêm `!important`

```css
p {
  color: black !important;
}
```

Kết quả:

```text
Màu đen
```

Vì `!important` ưu tiên cao hơn rule thường.
