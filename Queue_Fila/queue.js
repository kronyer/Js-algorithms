class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  //FIFO first-in first out => first-come first-served
  dequeue(element) {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  //aux
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  isEmpty() {
    return this.count - this.lowestCount === 0;
  }

  size() {
    return this.count - this.lowestCount;
  }
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

const queue = new Queue();
console.log("Queue");
console.log("______________________________");
console.log(queue.isEmpty());
queue.enqueue("Pedro");
queue.enqueue("Marcos");
queue.enqueue("Lucia");
queue.enqueue("Pietra");
queue.enqueue("Armando");
queue.enqueue("Fernando");

console.log(queue.toString());
console.log(queue.size());
console.log(queue.isEmpty());

console.log(queue.dequeue());
console.log(queue.size());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.toString());
console.log("______________________________");

function hotPotato(elementsList, num) {
  const queue = new Queue();
  const eliminatedList = [];

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i]);
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminatedList.push(queue.dequeue());
  }
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue(),
  };
}

const names = [
  "Pedro",
  "Pietra",
  "Mingau",
  "Alfred",
  "Pepeu",
  "Daisy",
  "Marujo",
  "Itamar",
];
const result = hotPotato(names, 7);
result.eliminated.forEach((name) => {
  console.log(`${name} was eliminated...`);
});
console.log(`The winner is: ${result.winner}`);
