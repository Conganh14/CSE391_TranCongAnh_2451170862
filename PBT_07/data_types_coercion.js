// Data Types & Coercion Test
console.log("=== typeof Tests ===");
console.log("typeof null:", typeof null);
console.log("typeof undefined:", typeof undefined);
console.log("typeof NaN:", typeof NaN);

console.log("\n=== Operator Coercion Tests ===");
console.log('"5" + 3:', "5" + 3);
console.log('"5" - 3:', "5" - 3);
console.log('"5" * "3":', "5" * "3");
console.log("true + true:", true + true);

console.log("\n=== Array/Object Coercion Tests ===");
console.log("[] + []:", [] + []);
console.log("[] + {}:", [] + {});
console.log("{} + []:", {} + []);

console.log("\n=== Explanation ===");
console.log("Why '5' + 3 = '53' but '5' - 3 = 2:");
console.log("- '+' operator: If either operand is a string, do STRING concatenation");
console.log("- '-' operator: Always does NUMERIC subtraction, so both operands convert to numbers");
