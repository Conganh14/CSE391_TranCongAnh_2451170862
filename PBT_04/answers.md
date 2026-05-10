# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 (10đ) — 5 Loại Positioning - Tài liệu tham chiếu: tuan_2_css_core/12_css_positioning.md

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
