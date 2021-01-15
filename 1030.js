var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');


//Para resolver esse problema, representei a roda do FV como um grafo direcionado,
//Onde cada nó é uma pessoa, que contém um apontador para a próxima pessoa viva da roda.

//Assim que alguém morre, a pessoa anterior a ela passa a apontar para a próxima pessoa da que morreu,
//Reduzindo o tamanho do grafo em um nó a cada vez. Quando sobrar uma pessoa apenas, ela é será a resposta


class Node {
    constructor(id) {
        this.id = id;
        this.next = null;
    }
}

function solveFlaviusJosephus(n, k) {
    let size = 0;
    let current = null;
    let first = null;

    if (n === 1) return 1;
    if (k === 1) return n;

    //Inicializa os nós e seus respectivos próximos. Current começa como o último da roda, para englobar a primeira vez que alguém morre
    while (size < n) {
        let node = new Node(size++);
        if (!current) {
            first = node;
            current = node
        }
        else {
            current.next = node;
            current = current.next;
        }
    }
    current.next = first;

    //Quando o próximo aponta para ele mesmo, terminou
    while (current.next.next !== current.next) {
        let res = cycle(k, current);
        let previous = res[0];
        let dead = res[1];
        previous.next = dead.next;
        current = dead;
    }
    return current.next.id
}


//Anda k vezes pelo grafo e retorna o anterior ao que morreu e o que morreu
function cycle(k, start) {
    let current = start;
    let previous = null
    let remainingSteps = k
    while (remainingSteps) {
        if (remainingSteps === 1) previous = current
        current = current.next
        remainingSteps--;
    }
    return [previous, current]
}

const start = () => {
    let rounds = parseInt(lines[0]);
    let round = 1
    while (round <= rounds) {
        let input = lines[round].split(' ').map(n => parseInt(n));
        let res = solveFlaviusJosephus(input[0], input[1]);
        console.log(`Case ${round}: ${res+1}`);
        round++;
    }
}

start();
