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

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY;
    if (callback) {
        callback(u);
    }
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w, color, adjList, callback);
        }
    }
    color[u] = Colors.BLACK;
}

const depthFirstSearch = (graph, callback) => {
    const vertices = graph.getVertices();
    const adjList = graph.adjList;
    const color = initializeColor(vertices);
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback);
        }
    }
}

export const DFS = graph => {
    const vertices = graph.getVertices();
    const adjList = graph.adjList;
    const color = initializeColor(vertices);
    const d = {};
    const f = {};
    const p = {};
    const time = { count: 0 };
    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }
    return {
        discovery: d,
        finished: f,
        predecessors: p
    };
};

const DFSVisit = (u, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY;
    d[u] = ++time.count;
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i];
        if (color[w] === Colors.WHITE) {
            p[w] = u;
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    color[u] = Colors.BLACK;
    f[u] = ++time.count;
};


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

const color = initializeColor(graph.getVertices());
depthFirstSearch( graph, printVertex);


const graphDAG = new Graph(true);
const myVerticesDAG = ['A', 'B', 'C', 'D', 'E', 'F'];
for (let i = 0; i < myVerticesDAG.length; i++) {
    graphDAG.addVertex(myVerticesDAG[i]);
}
graphDAG.addEdge('A', 'C');
graphDAG.addEdge('A', 'D');
graphDAG.addEdge('B', 'D');
graphDAG.addEdge('B', 'E');
graphDAG.addEdge('C', 'F');
graphDAG.addEdge('F', 'E');
const result = DFS(graphDAG);

const fTimes = result.finished;
let s = "";
for (let count = 0; count < myVerticesDAG.length; count++) {
    let max = 0;
    let maxName = null;
    for (let i = 0; i < myVerticesDAG.length; i++) {
        if (fTimes[myVerticesDAG[i]] > max) {
            max = fTimes[myVerticesDAG[i]];
            maxName = myVerticesDAG[i];
        }
    }
    s += ' - ' + maxName;
    delete fTimes[maxName];
}
console.log(s);


var graphDijkstra = [
    [0, 2, 4, 0, 0, 0],
    [0, 0, 1, 4, 2, 0],
    [0, 0, 0, 0, 3, 0],
    [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2],
    [0, 0, 0, 0, 0, 0]
];


const INF = Number.MAX_SAFE_INTEGER;
const dijkstra = (graph, src) => {
    const dist =[ ];
    const visited = [];
    const { length } = graph;
    for (let i = 0; i < length; i++) {
        dist[i] = INF;
        visited[i] = false;
    }
    dist[src] = 0;
    for (let i = 0; i < length - 1; i++) {
        const u = minDistance(dist, visited);
        visited[u] = true;
        for (let v = 0; v < length; v++) {
            if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
            }
        }
    }
    return dist;
}

const minDistance = (dist, visited) => {
    let min = INF;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

const floidWarshall = graph => {
    const dist = [];
    const { length } = graph;
    for (let i = 0; i < length; i++) {
        dist[i] = [];
        for (let j = 0; j < length; j++) {
            if (i === j) {
                dist[i][j] = 0;
            } else if (!isFinite(graph[i][j])) {
                dist[i][j] = Infinity;
            } else {
                dist[i][j] = graph[i][j];
            }
        }
    }
    for (let k = 0; k < length; k++) {
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
}

const prim = graph => {
    const parent = [];
    const key = [];
    const visited = [];
    const { length } = graph;
    for (let i = 0; i < length; i++) {
        key[i] = INF;
        visited[i] = false;
    }
    key[0] = 0;
    parent[0] = -1;
    for (let i = 0; i < length - 1; i++) {
        const u = minKey(graph, key, visited);
        visited[u] = true;
        for (let v = 0; v < length; v++) {
            if (graph[u][v] && !visited[v] && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }
    return parent;
}

const kruskal = graph => {
    const { length } = graph;
    const parent = [];
    let ne = 0;
    let a;
    let b;
    let u;
    let v;
    const set = [];
    while (ne <length -1)
    {
        for (let i = 0, min = INF; i < length; i++)
        {
            for (let j = 0; j < length; j++)
            {
                if (graph[i][j] < min)
                {
                    min = graph[i][j];
                    a = u = i;
                    b = v = j;
                }
            }
        }
        u = find(u, set);
        v = find(v, set);
        if (union(u, v, set))
        {
            parent[ne++] = [a, b];
        }
        graph[a][b] = graph[b][a] = INF;
    }
    return parent;
}

const find = (i, set) => {
    while (set[i])
    {
        i = set[i];
    }
    return i;
}

const union = (i, j, set) => {
    if (i !== j)
    {
        set[j] = i;
        return true;
    }
    return false;
}