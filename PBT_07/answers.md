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
