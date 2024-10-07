import {Compare, defaultCompare} from "../utils/index.js"   // {1}
import { Node } from "./Models/node.js"   // {2}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
      this.compareFn = compareFn;
      this.root = undefined;
    }
  
    insert(key) {
      // special case: first key
      if (this.root == null) {
        this.root = new Node(key);
      } else {
        this.insertNode(this.root, key);
      }
    }
  
    insertNode(node, key) {
      if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        if (node.left == null) {
          node.left = new Node(key);
        } else {
          this.insertNode(node.left, key);
        }
      } else if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.root, callback);
      }

      inOrderTraverseNode(node, callback) {
        if (node != null) {
          this.inOrderTraverseNode(node.left, callback);
          callback(node.key);
          this.inOrderTraverseNode(node.right, callback);
        }
      }

        preOrderTraverse(callback) {
            this.preOrderTraverseNode(this.root, callback);
        }

        preOrderTraverseNode(node, callback) {
            if (node != null) {
                callback(node.key);
                this.preOrderTraverseNode(node.left, callback);
                this.preOrderTraverseNode(node.right, callback);
            }
        }

        postOrderTraverse(callback) {
            this.postOrderTraverseNode(this.root, callback);
        }

        postOrderTraverseNode(node, callback) {
            if (node != null) {
                this.postOrderTraverseNode(node.left, callback);
                this.postOrderTraverseNode(node.right, callback);
                callback(node.key);
            }
        }

        min() {
            return this.minNode(this.root);
        }

        minNode(node) {
            let current = node;
            while (current != null && current.left != null) {
                current = current.left;
            }
            return current;
        }

        max() {
            return this.maxNode(this.root);
        }

        maxNode(node) {
            let current = node;
            while (current != null && current.right != null) {
                current = current.right;
            }
            return current;
        }

        search(key) {
            return this.searchNode(this.root, key);
        }

        searchNode(node, key) {
            if (node == null) {
                return false;
            }
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                return this.searchNode(node.left, key);
            }
            if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                return this.searchNode(node.right, key);
            }
            return true;
        }
}

const tree = new BinarySearchTree();   // {20}
tree.insert(11);   // {21}
tree.insert(7);   // {22}
tree.insert(15);   // {23}
tree.insert(5);   // {24}
tree.insert(3);   // {25}
tree.insert(9);   // {26}
tree.insert(8);   // {27}
tree.insert(10);   // {28}
tree.insert(13);   // {29}
tree.insert(12);   // {30}
tree.insert(14);   // {31}
tree.insert(20);   // {32}
tree.insert(18);   // {33}
tree.insert(25);   // {34}
tree.insert(6);   // {35}
const printNode = value => console.log(value);   // {36}
tree.inOrderTraverse(printNode);   // {37}

console.log(tree.min());   // {38}
console.log(tree.max());   // {39}

console.log(tree.search(1) ? 'Key 1 found.' : 'Key 1 not found.');   // {40}
console.log(tree.search(8) ? 'Key 8 found.' : 'Key 8 not found.');   // {41}