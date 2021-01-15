var input = require('fs').readFileSync('/dev/stdin', 'utf8');
var lines = input.split('\n');

class Node {
    constructor(id) {
        this.id = id;
        this.length = 0;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}


let line = 0
while (line <= lines.length) {
    line = readInputAndExecute(lines, line);
    if (parseInt(lines[line]) === 0) break;
}

function readInputAndExecute(lines, currentLine) {
    let N = parseInt(lines[currentLine]);
    const pathArray = []
    const queryArray = []
    for (let path = 1; path <= N-1; path++) {
        pathArray[path-1] = lines[currentLine+path].split(' ').map(n => parseInt(n));
    }
    let Q = parseInt(lines[currentLine+N]);
    for (let query = 1; query <= Q; query++) {
        queryArray[query-1] = lines[currentLine+N+query].split(' ').map(n => parseInt(n));
    }
    solveAntProblem(N, pathArray, queryArray);
    return currentLine + N + Q + 1;
}


function solveAntProblem(N, pathArray, queryArray) {
    let root = createTree(N, pathArray);
    // console.dir(root, {depth: null})
    let output = []
    queryArray.forEach(([node1, node2]) => {
        output.push(dfs(root, node1, node2, 0, 0));
    })
    console.log(output.join(" "));
}

//Inicializa a arvore e os filhos de cada nó
function createTree(N, pathArray) {
    let allNodes = [];
    for (let i = 0; i < N; i++) {
        allNodes.push(new Node(i));
    }
    for (let path = 0; path < pathArray.length; path++) {
        let node = allNodes[path+1];
        node.length = pathArray[path][1];
        allNodes[pathArray[path][0]].addChild(node);
    }
    return allNodes[0];
}


//Faz uma busca em profundidade na árvore até encontrar o caso em que um nó é ancestral dos dois nós da query
//1- Um nó sempre recebe de cima a distância da raiz até ele
//2- Um nó não-especial retorna a soma do que recebeu dos filhos para cima (por isso folhas não-especiais retornam 0) 
//3- Se um nó especial recebe um valor não-nulo de baixo, significa que ele é o LCA (lowest common ancestor) e portanto retorna o valor que recebeu menos a distância da raiz até ele
//4- Se um nó não-especial recebe dois valores não-nulos de baixo, signigica que ele é o LCA e portanto retorna o valor que recebeu menos duas vezes a distância da raiz até ele
//5- Um nó especial retorna a distância da raiz até ele para cima
function dfs(node, n1, n2, length, depth) {
    let sum = 0;
    let count = 0;
    let isTarget = (node.id === n1 || node.id === n2);
    if (isTarget) count++
    // let depthSpace = '\t'.repeat(depth)
    // console.log(`${depthSpace}Visited ${node.id}...(length=${length})`)
    for (let child = 0; child < node.children.length; child++) {
        let found = dfs(node.children[child], n1, n2, length + node.children[child].length, depth+1);
        if (found) count++;
        sum += found;
    }
    // console.log(`${depthSpace}Exited ${node.id}. isTarget=${isTarget}, count=${count}..`)
    // é o LCA entre os dois. Retorna a soma 
    if (count === 2 && isTarget) return sum - length;
    if (count === 2 && !isTarget) return sum - 2*length;
    if (!isTarget) return sum;
    return length;
}


