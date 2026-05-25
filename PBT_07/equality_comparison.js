// == vs === Comparison Test
console.log("=== Loose Equality (==) vs Strict Equality (===) ===\n");

console.log("Test 1:");
console.log('5 == "5":', 5 == "5");        // true (coercion)
console.log('5 === "5":', 5 === "5");      // false (different types)

console.log("\nTest 2:");
console.log('null == undefined:', null == undefined);    // true (special case)
console.log('null === undefined:', null === undefined);  // false

console.log("\nTest 3:");
console.log('NaN == NaN:', NaN == NaN);    // false (NaN never equals anything)
console.log('NaN === NaN:', NaN === NaN);  // false

console.log("\nTest 4:");
console.log('0 == false:', 0 == false);    // true (false coerces to 0)
console.log('0 === false:', 0 === false);  // false (different types)

console.log("\nTest 5:");
console.log('"" == false:', "" == false);  // true (both falsy)
console.log('"" === false:', "" === false); // false (different types)

console.log("\n=== Recommendation ===");
console.log("Always use === (strict equality) because:");
console.log("1. More predictable - no unexpected type coercion");
console.log("2. Safer for comparisons - prevents logic bugs");
console.log("3. Better performance - no conversion overhead");
console.log("4. Industry standard - all modern JS guides recommend ===");
