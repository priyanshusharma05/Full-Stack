"use strict";

const operations = ["add", "divide", "power", "root", "subtract"];
const num1 = 25, num2 = 0;

for (const op of operations) {
    try {
        let result;

        switch (op) {
            case "add": result = num1 + num2; break;
            case "subtract": result = num1 - num2; break;
            case "divide":
                if (num2 === 0) throw "Division by zero";
                result = num1 / num2;
                break;
            case "power": result = num1 ** num2; break;
            case "root":
                if (num1 < 0) throw "Negative root";
                result = Math.sqrt(num1);
                break;
            default:
                throw "InvalidOperationError";
        }

        console.log(op, result);
    } catch (err) {
        console.log("Error in", op, err);
    }
}
