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
