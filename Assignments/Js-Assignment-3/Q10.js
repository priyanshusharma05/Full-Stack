"use strict";

function outer() {
    var count = 5;

    const inner = () => {
        let count = 10;
        console.log(count);
    };

    console.log(count);
    inner();
}

outer();
