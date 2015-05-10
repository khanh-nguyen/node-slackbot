'use strict';

module.exports = rand;

// generate random number between [0, n)
function rand(n) {
    if (n <= 0) return 0;
    return Math.floor(Math.random()*n);
}

