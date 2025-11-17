"use strict";

var score = 50;
function announce() { console.log("Game started"); }
let status = "ready";
function startGame() { console.log(status); }

console.log(score);
announce();
startGame();


// arrow function part

"use strict";

let announceArrow = () => console.log("Game started");
let startArrow = () => console.log(status);

let score2 = 50;
let status2 = "ready";

console.log(score2);
announceArrow();
startArrow();
