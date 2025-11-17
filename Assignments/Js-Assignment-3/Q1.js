"use strict";

const apiData = ["25", "true", "false", "NaN", " ", "100px", "3.14", null, undefined];

const validNumbers = [];
const invalidNumbers = [];

for (const item of apiData) {
    const num = Number(item);
    const bool = Boolean(item);
    const str = String(item);

    console.log(item, num, bool, str);

    if (!isNaN(num) && item !== " " && item !== "100px") {
        validNumbers.push(num);
    } else {
        invalidNumbers.push(item);
    }
}

console.log("Valid:", validNumbers);
console.log("Invalid:", invalidNumbers);
