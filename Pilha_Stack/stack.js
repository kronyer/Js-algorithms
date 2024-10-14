export default class Stack {
  constructor() {
    this.items = [];
  }

  //LIFO
  push(element) {
    this.items.push(element);
  }

  pop() {
    return this.items.pop();
  }

  //adictional methos
  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  clear() {
    this.items = [];
  }
}

const stack = new Stack();
console.log("_________________________________________");
console.log("ARRAY STACK: \n");

console.log(stack.isEmpty());

stack.push(5);
stack.push(8);
console.log(stack.peek());

stack.push(11);
console.log(stack.size());
console.log(stack.isEmpty());

stack.push(15);

stack.pop();
stack.pop();
console.log(stack.size());
console.log("_________________________________________");

//Stack com items objetos e nao arrays => Ainda obedecendo o LIFO

//Push em apenas uma coisa por vez, diferente da versão de array

class StackObj {
  #items; //Private ES20
  #count; //Private ES20
  constructor() {
    this.#count = 0;
    this.#items = {}; //obj
  }

  //methods

  push(element) {
    this.#items[this.#count] = element; // Adiciona o elemento
    this.#count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.#count--;
    const result = this.#items[this.#count];
    delete this.#items[this.#count];
    return result;
  }

  size() {
    return this.#count;
  }

  isEmpty() {
    return this, this.#count === 0;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#items[this.#count - 1];
  }

  clear() {
    this.#items = {};
    this.#count = 0;
  }

  clearLIFO() {
    while (!this.isEmpty()) {
      this.pop();
    }
  }

  toString() {
    if ((this, this.isEmpty())) {
      return "";
    }
    let objString = `${(this, this.#items[0])}`;
    for (let i = 1; i < this.#count; i++) {
      objString = `${objString}, ${this.#items[i]}`;
    }
    return objString;
  }
}

const stackObj = new StackObj();
stackObj.push(5);
stackObj.push(8);

//Decimal to Binary conversion with stack
function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = "";

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }
  return binaryString;
}
console.log("_________________________________________");
console.log("DECIMAL TO BINARY: \n");
console.log(decimalToBinary(233));
console.log(decimalToBinary(10));
console.log(decimalToBinary(1000));
console.log("_________________________________________");

//Base Converter
function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let number = decNumber;
  let rem;
  let baseString = "";
  if (!(base >= 2 && base <= 36)) {
    return "";
  }
  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
console.log("_________________________________________");
console.log("BASE CONVERTER: \n");
console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
console.log(baseConverter(100345, 35));
console.log("_________________________________________");
