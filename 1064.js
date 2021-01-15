var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const positiveNumbers = [];
var sum = 0;

for (var number of lines) {
    number = parseFloat(number);
    if (number > 0) {
        positiveNumbers.push(number);
        sum += number;
    }
}

console.log(`${positiveNumbers.length} valores positivos`);
console.log(`${(sum/positiveNumbers.length).toFixed(1)}`);

