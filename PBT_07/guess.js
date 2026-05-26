const secretNumber = Math.floor(Math.random() * 100) + 1;
const MAX_ATTEMPTS = 7;

let attempts = 0;
const guessedList = [];

while (attempts < MAX_ATTEMPTS) {
  const raw = prompt(`Đoán số từ 1-100 (Lần ${attempts + 1}/${MAX_ATTEMPTS}):`);

  if (raw === null) {
    alert("Bạn đã thoát game. Đáp án là: " + secretNumber);
    break;
  }

  const num = Number(raw.trim());

  if (isNaN(num) || num % 1 !== 0 || num < 1 || num > 100) {
    alert("⚠ Input không hợp lệ! Chỉ nhập số nguyên từ 1 đến 100.");
    continue;
  }

  if (guessedList.indexOf(num) !== -1) {
    alert("⚠ Bạn đã đoán số " + num + " rồi! Thử số khác đi.");
    continue;
  }

  attempts++;
  guessedList.push(num);

  if (num === secretNumber) {
    alert("🎉 Đúng rồi! Bạn đoán đúng sau " + attempts + " lần!");
    break;
  } else if (num < secretNumber) {
    alert(
      "↑ Cao hơn! Số " +
        num +
        " nhỏ hơn đáp án. Còn " +
        (MAX_ATTEMPTS - attempts) +
        " lượt.",
    );
  } else {
    alert(
      "↓ Thấp hơn! Số " +
        num +
        " lớn hơn đáp án. Còn " +
        (MAX_ATTEMPTS - attempts) +
        " lượt.",
    );
  }
}

if (
  attempts >= MAX_ATTEMPTS &&
  guessedList[guessedList.length - 1] !== secretNumber
) {
  alert("💀 Hết lượt! Đáp án là: " + secretNumber + ". Chúc may mắn lần sau!");
}
