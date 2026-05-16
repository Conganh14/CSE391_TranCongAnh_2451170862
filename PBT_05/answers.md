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

# Câu A2 — Breakpoints

Breakpoints chuẩn theo Bootstrap:

| Breakpoint | Pixel    | Thiết bị đại diện          | Lưới sản phẩm nên hiển thị |
| ---------- | -------- | -------------------------- | -------------------------- |
| xs         | < 576px  | Điện thoại nhỏ (iPhone SE) | 1 cột                      |
| sm         | ≥ 576px  | Điện thoại lớn             | 2 cột                      |
| md         | ≥ 768px  | Máy tính bảng              | 2–3 cột                    |
| lg         | ≥ 992px  | Laptop                     | 3–4 cột                    |
| xl         | ≥ 1200px | Desktop                    | 4 cột                      |
| xxl        | ≥ 1400px | Màn hình lớn               | 4–6 cột                    |

# Câu A3 — Media Queries

| Chiều rộng màn hình | `.container` width |
| ------------------- | ------------------ |
| 375px (iPhone SE)   | `100%` (= 375px)   |
| 600px               | `540px`            |
| 800px               | `720px`            |
| 1000px              | `960px`            |
| 1400px              | `1140px`           |

# Câu A4 - SCSS Basics

## 1. Variables — "Sửa 1 chỗ, tất cả tự đổi"

Khai báo một lần, dùng ở khắp nơi. Khi cần đổi màu/font/spacing chỉ sửa đúng 1 dòng.

```scss
// Khai báo
$color-primary: #7c3aed;
$font-size-base: 16px;
$radius-sm: 6px;
$transition-base: 0.3s ease;

// Sử dụng
.btn-primary {
  background: $color-primary;
  font-size: $font-size-base;
  border-radius: $radius-sm;
}

.badge {
  background: $color-primary;
}
// Đổi $color-primary → tất cả tự đổi!
```

## 2. Nesting — CSS theo cấu trúc HTML

Thay vì lặp lại selector, viết lồng nhau theo đúng cấu trúc HTML. `&` là ký hiệu tham chiếu đến selector cha.

```scss
// SCSS
.navbar {
  background: #1a202c;
  padding: 16px;

  &__logo {
    // → .navbar__logo
    color: white;
    font-size: 18px;
  }

  &__links {
    // → .navbar__links
    display: flex;
    gap: 24px;

    a {
      color: rgba(white, 0.8);

      &:hover {
        // → .navbar__links a:hover
        color: white;
      }

      &--active {
        // → .navbar__links a--active
        color: $color-primary;
      }
    }
  }
}
```

```css
/* CSS sau khi compile */
.navbar {
  background: #1a202c;
  padding: 16px;
}
.navbar__logo {
  color: white;
  font-size: 18px;
}
.navbar__links {
  display: flex;
  gap: 24px;
}
.navbar__links a {
  color: rgba(255, 255, 255, 0.8);
}
.navbar__links a:hover {
  color: white;
}
.navbar__links a--active {
  color: #7c3aed;
}
```

> Không lồng quá 3 cấp — selector sẽ quá dài, khó debug.

## 3. Mixins — "Hàm CSS tái sử dụng"

Đóng gói một đoạn CSS hay dùng, có thể truyền tham số như hàm trong lập trình.

```scss
// Định nghĩa
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin button-style($bg, $color: white) {
  background: $bg;
  color: $color;
  padding: 8px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: darken($bg, 10%);
    transform: translateY(-2px);
  }
}

// Mixin responsive
@mixin respond-to($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 576px) {
      @content;
    }
  } @else if $breakpoint == tablet {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == desktop {
    @media (min-width: 1024px) {
      @content;
    }
  }
}

// Sử dụng
.modal {
  @include flex-center;
  position: fixed;
  inset: 0;
}

.btn-primary {
  @include button-style(#7c3aed);
}
.btn-danger {
  @include button-style(#dc2626);
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr;

  @include respond-to(tablet) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to(desktop) {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 4. @extend — Kế thừa

Cho phép một selector kế thừa toàn bộ CSS của selector khác, tránh viết lại.

```scss
// SCSS
.btn-base {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  @extend .btn-base; // kế thừa toàn bộ .btn-base
  background: #7c3aed;
  color: white;
}

.btn-outline {
  @extend .btn-base;
  background: transparent;
  border: 2px solid #7c3aed;
  color: #7c3aed;
}
```

```css
/* CSS sau khi compile — gộp selector lại */
.btn-base,
.btn-primary,
.btn-outline {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: #7c3aed;
  color: white;
}
.btn-outline {
  background: transparent;
  border: 2px solid #7c3aed;
  color: #7c3aed;
}
```

## Tại sao trình duyệt không đọc được `.scss`?

Trình duyệt chỉ hiểu CSS thuần. File `.scss` dùng cú pháp mở rộng (`$var`, `@mixin`, nesting...) mà trình duyệt không hiểu — cần **compile ra CSS trước**.

```
file.scss  →  [Sass Compiler]  →  file.css  →  Trình duyệt đọc được
```

**Các bước thực hiện:**

```bash
# Bước 1: Cài Sass
npm install -g sass

# Bước 2: Compile 1 lần
sass style.scss style.css

# Bước 3: Tự động compile khi lưu file (khuyên dùng)
sass --watch style.scss:style.css
```

Trong HTML link file CSS như bình thường
