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

        remove(key) {
            this.root = this.removeNode(this.root, key);
        }

        removeNode(node, key) {
            if (node == null) {
                return null;
            }
            if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
                node.left = this.removeNode(node.left, key);
                return node;
            }
            if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
                node.right = this.removeNode(node.right, key);
                return node;
            }
            // key is equal to node.item
            // handle 3 special conditions
            // 1 - a leaf node
            // 2 - a node with only 1 child
            // 3 - a node with 2 children
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }
            if (node.left == null) {
                node = node.right;
                return node;
            }
            if (node.right == null) {
                node = node.left;
                return node;
            }
            // node has 2 children
            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
}

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    getNodeHeight(node) {
        if (node == null) {
            return -1;
        }
        return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
    }

    rotationLL(node) {
        const tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        return tmp;
    }

    rotationRR(node) {
        const tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        return tmp;
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