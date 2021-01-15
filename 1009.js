var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const fixedSalary = parseFloat(lines[1]);
const totalSold = parseFloat(lines[2]);


console.log("TOTAL = R$ " + (fixedSalary + totalSold*0.15).toFixed(2));
