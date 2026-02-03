"use strict";

const transactions = [
    { id: 1, amount: 2000 },
    { id: 2, amount: -500 },
    { id: 3 },
    null
];

const valid = [];
const invalid = [];

for (const t of transactions) {
    try {
        if (t === null) throw "Null transaction";
        if (!t.id) throw "Missing ID";
        if (t.amount === undefined) throw "Missing amount";
        if (t.amount < 0) throw "Negative amount";

        valid.push(t);
    } catch (err) {
        invalid.push({ t, err });
    }
}

console.log("Valid:", valid);
console.log("Invalid:", invalid);
