"use strict";

const rawData = [
    '{"user":"Afzal","age":19}',
    '{"id":2}',
    '{invalid}',
    '{"user":"Aman","age":"20"}'
];

const clean = [];

for (let i = 0; i < rawData.length; i++) {
    try {
        const obj = JSON.parse(rawData[i]);
        if (!obj.user || !obj.age) throw "Missing fields";

        obj.age = Number(obj.age);
        if (obj.age >= 18) clean.push(obj);
    } catch (err) {
        console.log("Line", i + 1, "Error:", err);
    }
}

console.log("Clean:", clean);
