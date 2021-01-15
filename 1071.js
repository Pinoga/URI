var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

inputs = lines.map(l => parseInt(l)).sort((a,b)=>a-b);
let sumOfOdds = 0;

for (let index = inputs[0]+1; index < inputs[1]; index++) {
    if (index % 2 !== 0) {
        sumOfOdds += index;
    }
}

console.log(sumOfOdds)
