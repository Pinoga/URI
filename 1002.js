var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const PI =  3.14159;
const radius = parseFloat(lines[0]);

console.log("A=" + (PI*radius*radius).toFixed(4));
