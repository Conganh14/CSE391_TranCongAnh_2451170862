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
