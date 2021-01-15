var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

var amount = parseInt(lines[0]);

const banknotes = [100, 50, 20, 10, 5, 2, 1];
const arrangement = [0, 0, 0, 0, 0, 0, 0];
var index = 0;

//Calculate the number of banknotes' current value then repeat the process with the remainder
while (amount > 0) {
    var notes = Math.floor(amount / banknotes[index]);
    var amount = amount % banknotes[index];
    arrangement[index] = notes;
    index++;
}

console.log(parseInt(lines[0]));
for (index = 0; index < banknotes.length; index++) {
    console.log(`${arrangement[index]} nota(s) de R$ ${banknotes[index].toString()+',00'}`);
}


