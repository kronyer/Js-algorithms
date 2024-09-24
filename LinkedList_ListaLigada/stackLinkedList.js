class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList(); // pode ser usado linkedList desde que linked list faça uma referencia à tail (isso para criar uma pilha com linked list)
  }

  push(element) {
    this.items.push(element);
  }

  pop() {
    if (this.isEmpty()){
        return null;
    } 
    return this.items.removeAt(this.items.size() - 1);
  }
    peek() {
        if (this.isEmpty()){
            return undefined;
        }
        return this.items.getElementAt(this.items.size() - 1).element;  
  }
    isEmpty() {
        return this.items.isEmpty();
    }
    size() {
        return this.items.size();
    }
    clear() {
        this.items.clear();
    }
    toString() {
        return this.items.toString();
    }
}

//implementação
class Queue {
  constructor() {
    this.stack1 = new StackLinkedList();
    this.stack2 = new StackLinkedList();
  }

  enqueue(element) {
    this.stack1.push(element);
  }

  dequeue() {
    if (this.stack2.isEmpty()) {
      while (!this.stack1.isEmpty()) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2.pop();
  }

  isEmpty() {
    return this.stack1.isEmpty() && this.stack2.isEmpty();
  }

  size() {
    return this.stack1.size() + this.stack2.size();
  }

  clear() {
    this.stack1.clear();
    this.stack2.clear();
  }

  toString() {
    return this.stack1.toString() + this.stack2.toString();
  }
}

class Deque { //fila de duas pontas
  constructor() {
    this.frontStack = new StackLinkedList();
    this.backStack = new StackLinkedList();
  }

  addFront(element) {
    this.frontStack.push(element);
  }

  addBack(element) {
    this.backStack.push(element);
  }

  removeFront() {
    if (this.frontStack.isEmpty()) {
      while (!this.backStack.isEmpty()) {
        this.frontStack.push(this.backStack.pop());
      }
    }
    return this.frontStack.pop();
  }

  removeBack() {
    if (this.backStack.isEmpty()) {
      while (!this.frontStack.isEmpty()) {
        this.backStack.push(this.frontStack.pop());
      }
    }
    return this.backStack.pop();
  }

  isEmpty() {
    return this.frontStack.isEmpty() && this.backStack.isEmpty();
  }

  size() {
    return this.frontStack.size() + this.backStack.size();
  }

  clear() {
    this.frontStack.clear();
    this.backStack.clear();
  }

  toString() {
    return this.frontStack.toString() + this.backStack.toString();
  }
}

class Stack {
  constructor() {
    this.stack = new StackLinkedList();
  }

  push(element) {
    this.stack.push(element);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack.peek();
  }

  isEmpty() {
    return this.stack.isEmpty();
  }

  size() {
    return this.stack.size();
  }

  clear() {
    this.stack.clear();
  }

  toString() {
    return this.stack.toString();
  }
}