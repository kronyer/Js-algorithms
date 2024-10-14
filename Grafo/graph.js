import Dictionary from '../Dictionary/dictionary.js';
import Queue from '../Queue_Fila/queue.js';
import Stack from "../Pilha_Stack/stack.js";


const Colors ={
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary();
    }

    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    addEdge(a, b) {
        if (!this.adjList.get(a)) {
            this.addVertex(a);
        }
        if (!this.adjList.get(b)) {
            this.addVertex(b);
        }
        this.adjList.get(a).push(b);
        if (!this.isDirected) {
            this.adjList.get(b).push(a);
        }
    }

    getVertices() {
        return this.vertices;
    }

    toString(){
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += this.vertices[i] + ' -> ';
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += neighbors[j] + ' ';
            }
            s += '\n';
        }
        return s;
    }
    
}

const initializeColor = (vertices) => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

export const breadthFirstSeach = (graph, startVertex, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.adjList;
    const color = initializeColor(vertices);
    const queue = new Queue();
    queue.enqueue(startVertex);
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK;
        if (callback) {
            callback(u);
        }
    }
}

export const breadthFirstSeachDistance = (graph, startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.adjList;
    const color = initializeColor(vertices);
    const queue = new Queue();
    const distances ={};
    const predecessors = {};
    queue.enqueue(startVertex);
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0;
        predecessors[vertices[i]] = null;
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY;
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY;
                distances[w] = distances[u] + 1;
                predecessors[w] = u;
                queue.enqueue(w);
            }
        }
        color[u] = Colors.BLACK;
    }
        
        return {
            distances,
            predecessors
        };
}

const graph = new Graph();
const myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString());

const printVertex = (value) => console.log('Visited vertex: ' + value);
breadthFirstSeach(graph, myVertices[0], printVertex);

const shortestPathA =  breadthFirstSeachDistance(graph, myVertices[0]);
console.log(shortestPathA);

const fromVertex = myVertices[0];
for (let i = 1; i < myVertices.length; i++) {
    const toVertex = myVertices[i];
    const path = new Stack();
    for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
        path.push(v);
    }
    path.push(fromVertex);
    let s = path.pop();
    while (!path.isEmpty()) {
        s += ' - ' + path.pop();
    }
    console.log(s);
}