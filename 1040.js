var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

const weights = [2, 3, 4, 1];

let end = false

let average = 
    lines[0].split(' ').map(l => parseFloat(l))
    .reduce((acc, grade, index) => (acc + grade*weights[index]), 0)/10;

console.log(`Media: ${average.toFixed(1)}`);

if (average < 5) {
    console.log(`Aluno reprovado.`);
    end = true;
}
else if (average < 7) {
    console.log(`Aluno em exame.`);
}
else {
    console.log(`Aluno aprovado.`);
    end = true
}

if (!end) {
    let examGrade = parseFloat(lines[1]);
    average = (average + examGrade)/2;
    console.log(`Nota do exame: ${examGrade.toFixed(1)}`)
    if (average < 5) {
        console.log(`Aluno reprovado.`);
    }
    else {
        console.log(`Aluno aprovado.`)
    }
    console.log(`Media final: ${average.toFixed(1)}`)
}
