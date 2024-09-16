class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.size() === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  size() {
    return this.count - this.lowestCount;
  }

  toString() {
    if (this.isEmpty()) {
      return "";
    }
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}
console.log("Deque");
console.log("______________________________");
const deque = new Deque();
console.log(deque.isEmpty());

deque.addBack("Marcio");
deque.addBack("Lucio");
deque.addBack("Carol");
console.log(deque.toString());
console.log(deque.size());
console.log(deque.isEmpty());

deque.removeFront();
console.log(deque.toString());
deque.addFront("Lucia");
console.log(deque.toString());

deque.removeBack();
console.log(deque.toString());

deque.addBack("Malvino");
console.log(deque.toString());

function palindromeChecker(word) {
  if (
    word === undefined ||
    word === null ||
    (word !== null && word.length === 0)
  ) {
    return false;
  }
  const deque = new Deque();
  const lowerString = word.toLocaleLowerCase().split(" ").join("");
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log("\nVerificando palíndromos");
console.log("_________________________");
console.log(palindromeChecker("arara"));
console.log(palindromeChecker("saco velho"));
console.log(palindromeChecker("level"));
console.log(palindromeChecker("a"));
console.log(palindromeChecker("aa"));
console.log(palindromeChecker("kayak"));
console.log(palindromeChecker("bezerro"));
console.log(palindromeChecker("bonitao"));
console.log(palindromeChecker("Step on no pets"));
