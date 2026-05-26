const students = [
  { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
  { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
  { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
  { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
  { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
  { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
  { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
  { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

const results = [];

for (let i = 0; i < students.length; i++) {
  const s = students[i];

  const tb = parseFloat(
    (s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(1),
  );

  let xepLoai;
  if (tb >= 8.0) xepLoai = "Giỏi";
  else if (tb >= 6.5) xepLoai = "Khá";
  else if (tb >= 5.0) xepLoai = "Trung bình";
  else xepLoai = "Yếu";

  results.push({ ...s, tb, xepLoai });
}

console.log("\n=== BẢNG KẾT QUẢ ===");
console.log("| STT | Tên       | TB   | Xếp loại    |");
console.log("|-----|-----------|------|-------------|");

for (let i = 0; i < results.length; i++) {
  const r = results[i];
  const stt = String(i + 1).padEnd(3);
  const ten = r.name.padEnd(9);
  const tb = String(r.tb).padEnd(4);
  const xepLoai = r.xepLoai.padEnd(11);
  console.log(`| ${stt} | ${ten} | ${tb} | ${xepLoai} |`);
}

const demXepLoai = { Giỏi: 0, Khá: 0, "Trung bình": 0, Yếu: 0 };

for (let i = 0; i < results.length; i++) {
  demXepLoai[results[i].xepLoai]++;
}

console.log("\n=== SỐ SV MỖI XẾP LOẠI ===");
console.log("Giỏi:", demXepLoai["Giỏi"]);
console.log("Khá:", demXepLoai["Khá"]);
console.log("Trung bình:", demXepLoai["Trung bình"]);
console.log("Yếu:", demXepLoai["Yếu"]);

let svMax = results[0];
let svMin = results[0];

for (let i = 1; i < results.length; i++) {
  if (results[i].tb > svMax.tb) svMax = results[i];
  if (results[i].tb < svMin.tb) svMin = results[i];
}

console.log("\n=== ĐIỂM TB CAO NHẤT & THẤP NHẤT ===");
console.log(`Cao nhất: ${svMax.name} — ${svMax.tb} (${svMax.xepLoai})`);
console.log(`Thấp nhất: ${svMin.name} — ${svMin.tb} (${svMin.xepLoai})`);

let tongMath = 0,
  tongPhysics = 0,
  tongCs = 0;

for (let i = 0; i < students.length; i++) {
  tongMath += students[i].math;
  tongPhysics += students[i].physics;
  tongCs += students[i].cs;
}

const n = students.length;
console.log("\n=== ĐIỂM TB TOÀN LỚP TỪNG MÔN ===");
console.log("Toán:    ", parseFloat((tongMath / n).toFixed(2)));
console.log("Lý:      ", parseFloat((tongPhysics / n).toFixed(2)));
console.log("CNTT:    ", parseFloat((tongCs / n).toFixed(2)));

let tongTbNam = 0,
  demNam = 0;
let tongTbNu = 0,
  demNu = 0;

for (let i = 0; i < results.length; i++) {
  if (results[i].gender === "M") {
    tongTbNam += results[i].tb;
    demNam++;
  } else {
    tongTbNu += results[i].tb;
    demNu++;
  }
}

console.log("\n=== ĐIỂM TB THEO GIỚI TÍNH ===");
console.log("Nam:", parseFloat((tongTbNam / demNam).toFixed(2)));
console.log("Nữ: ", parseFloat((tongTbNu / demNu).toFixed(2)));
