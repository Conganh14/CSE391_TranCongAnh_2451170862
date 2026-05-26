# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — var / let / const

```js
// Đoạn 1
console.log(x);
var x = 5;

// Đoạn 2
console.log(y);
let y = 10;

// Đoạn 3
const z = 15;
z = 20;
console.log(z);

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);

// Đoạn 5
let a = 1;
{
  let a = 2;
  console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

# Dự đoán

- Output đoạn 1 : undefined
- Output đoạn 2 : ReferenceError
- Output đoạn 3 : TypeError
- Output đoạn 4 : [1, 2, 3, 4]
- Output đoạn 5 : Trong block: 2, Ngoài block: 1

# Các kết quả bất ngờ

| Trường hợp      | Điều bất ngờ                   |
| --------------- | ------------------------------ |
| var             | Có thể dùng trước khi khai báo |
| let             | Bị lỗi dù cũng có hoisting     |
| const array     | Vẫn sửa được phần tử           |
| let trong block | Không ảnh hưởng biến bên ngoài |

## Câu A2 — Data Types & Coercion

```javascript
console.log(typeof null); --> "object"
console.log(typeof undefined); --> "undefined"
console.log(typeof NaN); --> "number"
console.log("5" + 3); --> "53"
console.log("5" - 3); --> 2
console.log("5" * "3"); --> 15
console.log(true + true); --> 2
console.log([] + []); --> ""
console.log([] + {}); --> "[object Object]"
console.log({} + []); --> 0 hoặc "[object Object]"
```

## Giải thích:

### "5" + 3 = "53" (String Concatenation)

- Operator + có 2 chức năng: cộng số hoặc nối chuỗi
- Khi có bất kỳ operand nào là string, JS ưu tiên nối chuỗi
- "5" (string) + 3 (number) → coerce 3 thành "3" → "53"

### "5" - 3 = 2 (Numeric Coercion)

- Operator - chỉ dùng cho phép toán số học
- JS buộc convert cả 2 operand thành number
- "5" (string) - 3 (number) → convert "5" thành 5 → 5 - 3 = 2

### Quy tắc chung:

- - (cộng): Nếu có string → nối chuỗi; nếu không → cộng số
- -, \*, /, %: Luôn convert sang số trước khi tính

## Câu A3 — So sánh == vs ===

```javascript
console.log(5 == "5"); //T
console.log(5 === "5"); //F
console.log(null == undefined); //T
console.log(null === undefined); //F
console.log(NaN == NaN); //F
console.log(0 == false); //T
console.log(0 === false); //F
console.log("" == false); //T
```

## Quy tắc nên dùng : ===

1, Rõ ràng, dễ dự đoán:

- === chỉ so sánh value + type, không có "ma thuật"
- == có quy tắc coercion phức tạp, dễ gây lỗi

2. An toàn hơn:

- Avoid bugs như 0 == false mà bạn không mong muốn
- Làm rõ ý định: bạn muốn so sánh gì chính xác

3. Hiệu năng:

- === nhanh hơn vì không cần type conversion

4. Chuẩn mực ngành:

- ESLint, Prettier, các guide JavaScript khuyến nghị dùng ===
- Code style của Google, Airbnb, Facebook đều dùng ===

## Câu A4 — Truthy & Falsy

### Chỉ có 6 giá trị Falsy:

1. false (boolean)
2. 0 (số không)
3. "" (string rỗng)
4. null
5. undefined
6. NaN

```javascript
if ("0") console.log("A"); // In "A"
if ("") console.log("B"); // Không in "B"
if ([]) console.log("C"); // In "C"
if ({}) console.log("D"); // In "D"
if (null) console.log("E"); // Không in "E"
if (0) console.log("F"); // Không in "F"
if (-1) console.log("G"); // In "G"
if (" ") console.log("H"); // In "H"
```

## Câu A5 — Template Literals

1. Cách 1: Nối chuỗi đơn giản

```js
// Cũ (concatenation):
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";

// Mới (template literal):
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

2. Cách 2: URL động

```js
// Cũ (concatenation):
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;

// Mới (template literal):
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

3. Cách 3: HTML đa dòng (ưu điểm lớn nhất của template literals)

```js
// Cũ (concatenation):
var html =
  '<div class="card">' +
  "<h2>" +
  title +
  "</h2>" +
  "<p>" +
  description +
  "</p>" +
  "<span>Giá: " +
  price +
  "đ</span>" +
  "</div>";

// Mới (template literal):
var html = `<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>`;
```

# PHẦN C — SUY LUẬN

## Câu C1 — Debug JavaScript

### Đã sửa lỗi

```js
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (
    typeof giaBan !== "number" ||
    typeof phanTramGiam !== "number" ||
    isNaN(giaBan) ||
    isNaN(phanTramGiam)
  ) {
    return "Input không hợp lệ";
  }

  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

### Các lỗi và cách sửa

1. `if (giaSauGiam = 0)`
   - Lỗi: dùng toán tử gán `=` thay vì so sánh.
   - Hậu quả: `giaSauGiam` bị gán thành `0` và điều kiện luôn false.
   - Sửa: `if (giaSauGiam === 0)`.

2. `const gia = tinhGiaGiamGia("100000", 20)`
   - Lỗi: truyền `giaBan` dưới dạng chuỗi.
   - Hậu quả: JavaScript ép kiểu ngầm, nhưng nếu chuỗi không phải số sẽ ra `NaN`.
   - Sửa: truyền số `100000` hoặc chuyển `giaBan` thành số trước khi tính.

3. `var giamGia` nên dùng `const` hoặc `let`
   - Lỗi: `var` có phạm vi hàm và dễ gây nhầm lẫn.
   - Sửa: `const giamGia = ...` vì giá trị không cần thay đổi.

4. `let giaSauGiam` nên dùng `const`
   - Lỗi: biến không được gán lại sau khi khởi tạo.
   - Sửa: `const giaSauGiam = ...` để thể hiện giá trị bất biến.

5. Trả về kiểu dữ liệu không đồng nhất
   - Lỗi: khi phần trăm giảm sai trả về chuỗi lỗi, khi hợp lệ trả về số.
   - Hậu quả: gây khó xử lý nếu dùng kết quả cho phép toán tiếp.
   - Sửa: chuẩn hóa kiểu trả về hoặc xử lý lỗi riêng bằng `throw`/callback.

6. Vòng lặp `for (var i = 0; i < 5; i++)` và `setTimeout`
   - Lỗi ẩn: `var` là function-scoped, không block-scoped.
   - Hậu quả: callback `setTimeout` chạy sau khi vòng lặp kết thúc, nên `i` đã là `5`.
   - Sửa: dùng `let i = 0` để mỗi lần lặp giữ một giá trị `i` riêng.

### Giải thích lỗi ẩn với `var`

- `var` tạo biến chung cho toàn bộ hàm, nên mọi callback đều tham chiếu cùng một `i`.
- Khi `setTimeout` chạy sau 1 giây, vòng lặp đã hoàn tất và `i` đã tăng đến `5`.
- Vì vậy bạn sẽ thấy `Item 5` in ra 5 lần.
- Dùng `let i` tạo biến mới cho mỗi lần lặp, nên mỗi callback in đúng `Item 0`, `Item 1`, ..., `Item 4`.
