## Câu A1 — Function Declaration vs Expression vs Arrow

### 1. Function Declaration

```js
function tinhThueBaoHiem(luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
}
```

### 2. Function Expression

```js
const tinhThueBaoHiem = function (luong) {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
};
```

### 3. Arrow Function

```js
const tinhThueBaoHiem = (luong) => {
  const thue = luong > 11000000 ? luong * 0.1 : 0;
  return {
    thuong: thue,
    thuc_nhan: luong - thue,
  };
};
```

### Hoisting: khác nhau không?

- `Function Declaration` được hoisted hoàn chỉnh: tên hàm và thân hàm được đưa lên trên cùng trước khi chạy code.
- `Function Expression` và `Arrow Function` gắn vào biến. Nếu dùng `const`/`let`, biến này không thể truy cập trước khi khởi tạo (TDZ).

### Ví dụ thực tế

```js
// Function declaration
console.log(tinhThueBaoHiem(12000000)); // Hoạt động vì hàm declaration được hoisted

// Function expression / arrow
console.log(tinhThueBaoHiem(12000000));
const tinhThueBaoHiem = function (luong) { ... };
```

- Với `Function Declaration`: có thể gọi hàm trước khi định nghĩa.
- Với `Function Expression` / `Arrow Function` dùng `const`/`let`: gọi trước định nghĩa sẽ gây `ReferenceError`.

### Kết luận

- Cả 3 cách đều tạo hàm nhưng chỉ `Function Declaration` được hoisted hoàn chỉnh.
- `Function Expression` và `Arrow Function` thì chỉ biến được hoisted (nếu `var`) hoặc không sử dụng được trước khi khởi tạo (với `const`/`let`).
- Do đó, về hoisting có sự khác biệt rõ ràng: declaration hoisted toàn bộ, expression/arrow thì không.

## Câu A2 — Scope & Closure

### Dự đoán output

```js
// Đoạn 1:
console.log(c.increment()); // 1
console.log(c.increment()); // 2
console.log(c.increment()); // 3
console.log(c.decrement()); // 2
console.log(c.getCount()); // 2

// Đoạn 2:
// Output sau 200ms:
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2
```

### Giải thích

- `counter()` tạo một scope riêng với biến `count`.
- Các hàm `increment`, `decrement`, `getCount` đóng gói `count` bằng closure.
- `increment()` tăng `count` rồi trả về giá trị mới, `decrement()` giảm rồi trả về giá trị mới.
- `getCount()` chỉ đọc giá trị hiện tại.
- Vì vậy sau 3 lần `increment()`, `count` = 3. `decrement()` giảm về 2 và `getCount()` trả lại 2.

### Tại sao `var` và `let` khác nhau trong vòng lặp `setTimeout`

- `var` là function-scoped, không tạo scope mới cho mỗi lần lặp.
- Vòng lặp `for (var i = 0; i < 3; i++)` chỉ có một biến `i` chung.
- Callback `setTimeout` được gọi sau khi vòng lặp kết thúc, lúc đó `i` đã tăng tới `3`.
- Vì vậy cả 3 callback in ra `var: 3`.

- `let` là block-scoped và tạo một biến mới cho mỗi lần lặp.
- Mỗi callback `setTimeout` giữ bản sao `j` riêng trong mỗi vòng lặp.
- Do đó các callback in đúng `let: 0`, `let: 1`, `let: 2`.

### Tóm tắt

- `var` trong vòng lặp không phù hợp khi dùng với callback bất đồng bộ vì chỉ có một biến chung.
- `let` tạo scope theo lần lặp, giúp callback tham chiếu đến giá trị đúng tại thời điểm đó.

## Câu A3 — Array Methods

```js
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = nums.filter((n) => n % 2 === 0);
const timesThree = nums.map((n) => n * 3);
const sumAll = nums.reduce((total, n) => total + n, 0);
const firstOverSeven = nums.find((n) => n > 7);
const hasOverTen = nums.some((n) => n > 10);
const allPositive = nums.every((n) => n > 0);
const labeled = nums.map((n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`);
const reversed = [...nums].reverse();
```

- `evens` → `[2, 4, 6, 8, 10]`
- `timesThree` → `[3, 6, 9, ..., 30]`
- `sumAll` → `55`
- `firstOverSeven` → `8`
- `hasOverTen` → `false`
- `allPositive` → `true`
- `labeled` → `['Số 1 là lẻ', 'Số 2 là chẵn', ...]`
- `reversed` → `[10, 9, ..., 1]`

## Câu A4 — Object Destructuring & Spread

```js
const product = {
  name: "iPhone 16",
  price: 25990000,
  specs: { ram: 8, storage: 256, color: "Titan" },
};

// Destructuring
const {
  name,
  price,
  specs: { ram, color },
} = product;
console.log(name, price, ram, color); // iPhone 16 25990000 8 Titan
console.log(specs); // ReferenceError: specs is not defined

// Spread
const updated = { ...product, price: 23990000, sale: true };
console.log(updated.price); // 23990000
console.log(updated.sale); // true
console.log(product.price); // 25990000 (gốc không đổi)

// Spread gotcha
const copy = { ...product };
copy.specs.ram = 16;
console.log(product.specs.ram); // 16 — vì spread là shallow copy, `specs` vẫn tham chiếu tới cùng object
```

### Giải thích ngắn

- Khi dùng `const { specs: { ram, color } } = product` thì chỉ `ram` và `color` được khai báo; không có biến `specs` mới trong scope, nên `console.log(specs)` sẽ ném `ReferenceError`.
- `...product` tạo một shallow copy (sao chép thuộc tính ở mức 1). Thuộc tính nguyên thuỷ (như `price`) được copy giá trị, nên thay đổi `updated.price` không ảnh hưởng `product.price`.
- Nhưng thuộc tính là object (như `specs`) vẫn là reference — copy nông giữ cùng reference. Thay đổi `copy.specs.ram` sẽ ảnh hưởng `product.specs.ram`.
