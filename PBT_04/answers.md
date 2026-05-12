# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 5 Loại Positioning - Tài liệu tham chiếu: tuan_2_css_core/12_css_positioning.md

| Position   | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí                       | Cuộn theo trang? | Use case                                  |
| ---------- | ------------------------- | --------------------------------------- | ---------------- | ----------------------------------------- |
| `static`   | Có                        | Vị trí mặc định trong document flow     | Có               | Layout thông thường                       |
| `relative` | Có                        | So với vị trí ban đầu của chính nó      | Có               | Dịch chuyển element, làm mốc cho absolute |
| `absolute` | Không                     | Parent gần nhất có `position != static` | Có               | Badge, overlay, icon, popup               |
| `fixed`    | Không                     | Viewport (màn hình trình duyệt)         | Không            | Header fixed, back-to-top button          |
| `sticky`   | Có                        | Scroll container gần nhất               | Một phần\*       | Sticky navbar, sidebar                    |

> `sticky`: Ban đầu cuộn bình thường, đến ngưỡng (`top`, `left`...) thì giữ cố định.

# Câu hỏi thêm

## 1. Khi nào `absolute` tham chiếu `body`?

Khi không có parent hoặc ancestor nào có:

- `position: relative`
- `position: absolute`
- `position: fixed`
- `position: sticky`

Lúc đó element sẽ tham chiếu đến `body` (hoặc document).

## 2. Khi nào `absolute` tham chiếu parent?

Khi parent gần nhất có `position != static`.

## 3. Nearest positioned ancestor là gì?

Là:

**Ancestor gần nhất có `position != static`.**

CSS sẽ tìm từ element hiện tại đi ngược lên các thẻ cha. Gặp thẻ đầu tiên có `position` khác `static` thì dùng thẻ đó làm mốc định vị.

## Câu A2 — Flexbox vs Grid - Tài liệu tham chiếu: tuan_3_css_advanced/13_creating_responsive_layouts.md

## Trường hợp 1

```css
.container {
  display: flex;
}
.item {
  flex: 1;
}
```

Có **4 items**.

- `display: flex` → mặc định xếp theo hàng ngang.
- `flex: 1` → các item chia đều chiều rộng.

Bố cục:

```text
+------+------+------+------+
|  1   |  2   |  3   |  4   |
+------+------+------+------+
```

→ **1 hàng, 4 cột**

## Trường hợp 2

```css
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 45%;
  margin: 2.5%;
}
```

Có **6 items**.

Tính toán:

- `45% + 2.5% + 2.5% = 50%`
- Mỗi item chiếm khoảng 50%.

=> Mỗi hàng chứa **2 items**.

Bố cục:

```text
+------+------+
|  1   |  2   |
+------+------+
|  3   |  4   |
+------+------+
|  5   |  6   |
+------+------+
```

→ **3 hàng, 2 cột**

## Trường hợp 3

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

Có **3 items**.

- `space-between` → item đầu ở trái, item cuối ở phải, item giữa ở giữa.
- `align-items: center` → căn giữa theo chiều dọc.

Bố cục:

```text
+--------------------------------+
|  1          2            3     |
+--------------------------------+
```

→ **1 hàng, khoảng cách đều**

## Trường hợp 4

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  gap: 20px;
}
```

Có **3 items**.

- Cột 1 = `200px`
- Cột 2 = phần còn lại (`1fr`)
- Cột 3 = `200px`

Bố cục:

```text
+--------+----------------+--------+
|   1    |       2        |   3    |
+--------+----------------+--------+
```

→ **1 hàng, 3 cột**

## Trường hợp 5

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

Có **7 items**.

- `repeat(3, 1fr)` → 3 cột bằng nhau.
- 7 items → tự xuống hàng.

Bố cục:

```text
+------+------+------+
|  1   |  2   |  3   |
+------+------+------+
|  4   |  5   |  6   |
+------+------+------+
|  7   |
+------+
```

→ **3 hàng**

- Hàng 1: 3 items
- Hàng 2: 3 items
- Hàng 3: 1 item

→ **Item cuối (số 7) nằm ở cột đầu tiên của hàng thứ 3**

# PHẦN C — SUY LUẬN

## Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

1. Navigation bar ngang (logo + menu + buttons)

→ Flexbox

Lý do: Đây là layout 1 chiều (theo hàng ngang), Flexbox giúp căn chỉnh, spacing, và align rất thuận tiện.

2. Lưới ảnh Instagram (3 cột đều nhau, số ảnh không biết trước)

→ Grid

Lý do: Đây là layout 2 chiều (hàng + cột), Grid giúp chia cột đều và tự động xuống hàng dễ dàng.

3. Layout blog (main content + sidebar)

→ Grid

Lý do: Có các vùng bố cục rõ ràng theo cột, Grid kiểm soát kích thước các vùng tốt hơn.

4. Footer với 4 cột thông tin

→ Grid

Lý do: Cần chia nhiều cột đều nhau, Grid phù hợp cho bố cục nhiều vùng.

5. Card sản phẩm (ảnh trên, text giữa, nút dưới — nút luôn dính đáy)

→ Kết hợp cả hai

Grid/Flex cho layout tổng thể card list
Flexbox bên trong card (flex-direction: column) để nút luôn nằm dưới.

Lý do: Kết hợp giúp vừa quản lý bố cục ngoài, vừa căn chỉnh nội dung bên trong tốt.

### Câu C2 — Debug Flexbox

**Lỗi 1:** Cards không đều chiều cao — nút "Mua" bị nhảy lên/xuống

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
}
.card {
  width: 30%;
  margin: 1.5%;
}
.card img {
  width: 100%;
}
.card h3 {
  font-size: 18px;
}
.card .btn {
  padding: 10px;
}
```

# Nguyên nhân:

1. Các .card chứa lượng nội dung khác nhau (card có text dài, card có text ngắn), nên chiều cao mỗi card không bằng nhau.
2. Do button .btn đang nằm ngay sau nội dung nên nó bị đẩy lên/xuống theo độ dài text, khiến các nút không thẳng hàng.

# Cách sửa

```css
.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

.card {
  width: 30%;
  margin: 1.5%;

  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: auto;
}
```

**Lỗi 2:** Muốn items nằm giữa cả ngang lẫn dọc trong container 100vh, nhưng item vẫn dính góc trái trên

```css
.hero {
  height: 100vh;
  display: flex;
}
.hero-content {
  text-align: center;
}
```

# Nguyên Nhân

1. Container .hero đã dùng display: flex, nhưng chưa thiết lập căn giữa theo trục ngang và trục dọc.
2. Flexbox mặc định đặt item ở vị trí bắt đầu (flex-start), nên nội dung nằm ở góc trên bên trái thay vì ở giữa.

# Cách sửa

```css
.hero {
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
}
```

**Lỗi 3:** Sidebar bị co lại khi content quá dài

```css
.layout {
  display: flex;
}
.sidebar {
  width: 250px;
}
.content {
  flex: 1;
}
```

# Nguyên Nhân

1. Trong Flexbox, mặc định các item có: `css flex-shrink: 1;` nên sidebar được phép co lại khi thiếu không gian.

# Cách sửa

```css
.layout {
  display: flex;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  border: 1px solid black;
}

.content {
  flex: 1;
}
```
