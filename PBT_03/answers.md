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

# Câu B1 Phần thực hành B

# Các selector đã dùng trong bài

1.  -                 universal
2.  body element
3.  .active class
4.  nav a descendant
5.  a:hover pseudo-class
6.  tr:nth-child() pseudo-class

# Câu B2 phần thực hành B

## Phần 1

Hộp 1 (content-box): chiều rộng thực tế = 350px
Hộp 2 (border-box): chiều rộng thực tế = 300px
Giải thích:

content-box:
300 + 20*2 + 5*2 = 350px

border-box:
padding + border được tính bên trong 300px.

## Phần 2

Tổng layout = 1000px

Sidebar = 250px  
Content = 500px  
Ads = 250px

Tổng:

250 + 500 + 250 = 1000px

Nếu không dùng border-box, tổng sẽ lớn hơn 1000px vì padding làm tăng kích thước thực tế.

# Câu B3 phần thực hành B

## 1. Danh sách 10 CSS Rules và Specificity Score

Dưới đây là bảng thống kê các rules đã sử dụng trong file `specificity.css`:

| Thứ tự | CSS Rule                         | Màu sắc | Specificity Score |
| :----- | :------------------------------- | :------ | :---------------- |
| 1      | `*`                              | Gray    | 0, 0, 0           |
| 2      | `p`                              | Red     | 0, 0, 1           |
| 3      | `body p`                         | Blue    | 0, 0, 2           |
| 4      | `.text`                          | Green   | 0, 1, 0           |
| 5      | `.text.highlight`                | Orange  | 0, 2, 0           |
| 6      | `p.text.highlight`               | Purple  | 0, 2, 1           |
| 7      | `#demo`                          | Brown   | 1, 0, 0           |
| 8      | `p#demo`                         | Cyan    | 1, 0, 1           |
| 9      | `#demo.text`                     | Magenta | 1, 1, 0           |
| 10     | `html body #demo.text.highlight` | Black   | 1, 2, 2           |

## 2. Kết quả hiển thị

- **Màu hiển thị cuối cùng:** Màu **Black** (Đen).
- **Tại sao?**: Vì rule `html body #demo.text.highlight` có điểm Specificity cao nhất (1, 2, 2). Theo quy tắc ưu tiên của trình duyệt, rule nào có điểm cụ thể cao hơn sẽ được áp dụng, bất kể thứ tự xuất hiện trong file CSS.

## 4. hay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.

- **Trả lời:**
  - Kết quả **KHÔNG** thay đổi nếu các rules có điểm Specificity khác nhau. Trình duyệt luôn ưu tiên rule có điểm cao hơn.
  - Kết quả **CHỈ** thay đổi nếu hai rules có cùng điểm Specificity. Khi đó, rule nào được viết sau (nằm dưới) sẽ thắng do quy tắc Cascade (Dòng chảy).

  ## PHẦN C — DEBUG & SUY LUẬN

  # Câu C1 (10đ) — Debug CSS Layout
  1.  Theo mặc định (box-sizing: content-box), chiều rộng thực tế của một phần tử được tính bằng công thức:Total Width = width + padding-left + padding-right + border-left + border-rightDựa vào code trong ảnh, ta có:Sidebar:$300px$ (width) + $20px$ (padding-left) + $20px$ (padding-right) + $1px$ (border-left) + $1px$ (border-right) = 342pxContent:$660px$ (width) + $30px$ (padding-left) + $30px$ (padding-right) + $1px$ (border-left) + $1px$ (border-right) = 722px
  2.  Layout bị vỡ (phần content bị đẩy xuống dòng) vì tổng chiều rộng thực tế của hai khối lớn hơn chiều rộng của container cha.Tổng chiều rộng thực tế: $342px$ (sidebar) + $722px$ (content) = 1064pxChiều rộng Container: 960pxVì 1064px > 960px, không còn đủ không gian trống trên cùng một hàng nên thuộc tính float: left sẽ đẩy phần tử đứng sau (content) xuống dòng dưới.
  3.  Cách 1: Sử dụng box-sizing: border-box (Cách khuyên dùng)Cách này sẽ gộp cả padding và border vào trong chiều rộng (width) đã khai báo ban đầu.Giải pháp: Thêm box-sizing: border-box cho cả hai. Khi đó sidebar vẫn là $300px$, content vẫn là $660px$. Tổng = $960px$ (khớp hoàn toàn với container).
      Cách 2: Không dùng border-box (Tính toán thủ công)Ta phải trừ bớt phần padding và border ra khỏi giá trị width để tổng cuối cùng đạt đúng con số mong muốn.Sidebar mới: $300px - (20px * 2) - (1px * 2) =$ 258pxContent mới: $660px - (30px * 2) - (1px * 2) =$ 598pxKiểm tra: $258px + 42px$ (padding+border) + $598px + 62px$ (padding+border) = 960px.
