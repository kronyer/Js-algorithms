import { Node } from "./Models/index.js";
import { defaultEquals } from "../utils/index.js";

export default class LinkedList {
  #count;
  #head;
  #equalsFn;

  constructor(equalsFn = defaultEquals) {
    this.#count = 0;
    this.#head = undefined;
    this.#equalsFn = equalsFn;
  }

  push(element) {
    // Create a new node with the given element
    const node = new Node(element);
    let current;

    // If the list is empty, set the new node as the head
    if (this.#head == null) {
      this.#head = node;
    } else {
      // Otherwise, iterate to the end of the list
      current = this.#head;
      while (current.next != null) {
        current = current.next;
      }
      // Append the new node at the end of the list
      current.next = node;
    }
    // Increment the count of elements in the list
    this.#count++;
  }

  removeAt(index) {
    // Check if the index is within the valid range
    if (index >= 0 && index < this.#count) {
      let current = this.#head;

      // If removing the first element, update the head
      if (index === 0) {
        this.#head = current.next;
      } else {
        // Get the previous node of the node to be removed
        const previous = this.getElementAt(index - 1);
        current = previous.next;
        // Update the next pointer of the previous node to skip the removed node
        previous.next = current.next;
      }
      // Decrement the count of elements in the list
      this.#count--;
      // Return the element of the removed node
      return current.element;
    }
    // Return undefined if the index is out of range
    return undefined;
  }

  getElementAt(index) {
    if (index >= 0 && index <= this.#count) {
      // Check if the index is within valid range
      let node = this.#head; // Start from the head of the list

      for (let i = 0; i < index && node != null; i++) {
        // Traverse the list until the desired index
        node = node.next; // Move to the next node
      }
      return node; // Return the node at the specified index
    }
    return undefined; // Return undefined if the index is out of range
  }

  insert(element, index) {
    if (index >= 0 && index <= this.#count) {
      // Check if the index is within valid range
      const node = new Node(element); // Create a new node with the given element

      if (index === 0) {
        // If inserting at the head of the list
        const current = this.#head; // Save the current head
        node.next = current; // Point the new node to the current head
        this.#head = node; // Update the head to be the new node
      } else {
        // If inserting at any position other than the head
        const previous = this.getElementAt(index - 1); // Get the node just before the insertion point
        const current = previous.next; // Save the current node at the insertion point
        node.next = current; // Point the new node to the current node
        previous.next = node; // Update the previous node to point to the new node
      }
      this.#count++; // Increment the count of nodes in the list
      return true; // Return true indicating successful insertion
    }
    return false; // Return false if the index is out of range
  }

  indexOf(element) {
    let current = this.#head; // Start from the head of the list
    for (let i = 0; i < this.#count && current != null; i++) {
      // Iterate through the list
      if (this.#equalsFn(element, current.element)) {
        // Compare the elements
        return i; // Return the index if the element is found
      }
      current = current.next; // Move to the next node
    }
    return -1; // Return -1 if the element is not found
  }

  remove(element) {
    const index = this.indexOf(element); // Get the index of the element
    return this.removeAt(index); // Remove the element at the specified index
  }

  size() {
    return this.#count; // Return the number of elements in the list
  }

  isEmpty() {
    return this.size() === 0; // Return true if the list is empty
  }

  getHead() {
    return this.#head; // Return the head of the list
  }

  toString() {
    if (this.#head == null) {
      // Check if the list is empty
      return ""; // Return an empty string if the list is empty
    }
    let objString = `${this.#head.element}`; // Initialize the string with the first element
    let current = this.#head.next; // Start from the second element

    for (let i = 1; i < this.#count && current != null; i++) {
      // Iterate through the list
      objString = `${objString},${current.element}`; // Concatenate the string representation of the current element
      current = current.next; // Move to the next element
    }
    return objString; // Return the string representation of the list
  }
}

const list = new LinkedList();
list.push(15);
list.push(9);
list.push(10);
console.log(list.toString());
list.removeAt(1);
console.log(list.toString());
list.insert(10, 1);
console.log(list.toString());
