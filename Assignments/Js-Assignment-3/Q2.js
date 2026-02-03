"use strict";

const employees = [
    { name: "Amit", salary: "45000", years: "5" },
    { name: "Sara", salary: "38000", years: "2" },
    { name: "Kiran", salary: "52000", years: "7" }
];

for (const emp of employees) {
    try {
        if (!emp.name || !emp.salary || !emp.years) throw "Missing property";

        const sal = Number(emp.salary);
        const yrs = Number(emp.years);
        const bonus = yrs > 3 ? sal * 0.1 : sal * 0.05;

        console.log(`${emp.name} | Salary: ${sal} | Years: ${yrs} | Bonus: ${bonus}`);
    } catch (err) {
        console.log("Error:", err);
    }
}
