// Truthy & Falsy Test
console.log("=== Truthy & Falsy Values Test ===\n");

console.log("Falsy values in JavaScript: false, 0, \"\", null, undefined, NaN\n");

console.log("=== Testing if statements ===\n");

if ("0") console.log("A - In: '0' là truthy (non-empty string)");
else console.log("B - Không in");

if ("") console.log("B - In");
else console.log("B - Không in: '' là falsy (empty string)");

if ([]) console.log("C - In: [] là truthy (array object)");
else console.log("C - Không in");

if ({}) console.log("D - In: {} là truthy (object)");
else console.log("D - Không in");

if (null) console.log("E - In");
else console.log("E - Không in: null là falsy");

if (0) console.log("F - In");
else console.log("F - Không in: 0 là falsy");

if (-1) console.log("G - In: -1 là truthy (non-zero number)");
else console.log("G - Không in");

if (" ") console.log("H - In: ' ' là truthy (non-empty string with space)");
else console.log("H - Không in");

console.log("\n=== Summary ===");
console.log("Sẽ in: A, C, D, G, H");
console.log("Không in: B, E, F");
