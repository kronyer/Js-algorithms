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

    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    insert(key) {
        this.root = this.insertNode(this.root, key);
    }

    insertNode(node, key){
        if(node === null)
            return new Node(key);
        else if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            node.left = this.insertNode(node.left, key);
        }
        else if(this.compareFn(key, node.key) === Compare.BIGGER_THAN){
            node.right = this.insertNode(node.right, key);
        }
        else
            return node; // duplicated key

        // verify if tree is balanced
        const balanceState = this.getBalanceFactor(node);
        if(balanceState === BalanceFactor.UNBALANCED_LEFT){
            if(this.compareFn(key, node.left.key) === Compare.LESS_THAN){
                node = this.rotationLL(node);
            } else {
                return this.rotationLR(node);
            }
        }
        if(balanceState === BalanceFactor.UNBALANCED_RIGHT){
            if(this.compareFn(key, node.right.key) === Compare.BIGGER_THAN){
                node = this.rotationRR(node);
            } else {
                return this.rotationRL(node);
            }
        }
        return node;

    }

    getBalanceFactor(node){
        const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch(heightDifference){
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            default:
                return BalanceFactor.BALANCED;
        }
    }

    removeNode(node, key){
        node = super.removeNode(node, key);
        if(node === null){
            return node;
        }
        // verify if tree is balanced
        const balanceState = this.getBalanceFactor(node);
        if(balanceState === BalanceFactor.UNBALANCED_LEFT){
            const balanceStateLeft = this.getBalanceFactor(node.left);
            if(balanceStateLeft === BalanceFactor.BALANCED || balanceStateLeft === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationLL(node);
            }
            if(balanceStateLeft === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationLR(node.left);
            }
        }
        if(balanceState === BalanceFactor.UNBALANCED_RIGHT){
            const balanceStateRight = this.getBalanceFactor(node.right);
            if(balanceStateRight === BalanceFactor.BALANCED || balanceStateRight === BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT){
                return this.rotationRR(node);
            }
            if(balanceStateRight === BalanceFactor.SLIGHTLY_UNBALANCED_LEFT){
                return this.rotationRL(node.right);
            }
        }
        return node;
    }
}

class RedBlackNode extends Node {
    constructor(key){
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
        this.parent = null;
    }
    isRed(){
        return this.color === Colors.RED;
    }
}

class RedBlackTree extends BinarySearchTree{
    constructor(compareFn = defaultCompare){
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    insert(key){
        if(this.root == null){
            this.root = new this.RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }

    insertNode(node, key){
        if(this.compareFn(key, node.key) === Compare.LESS_THAN){
            if(node.left == null){
                node.left = new this.RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            }
        }
        if(node.right == null){
            node.right = new this.RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }

    fixTreeProperties(node){
        while(node && node.parent && node.parent.color.isRed() && node.color !== Colors.BLACK){
            let parent = node.parent;
            const grandParent = parent.parent;
            // case A
            if(grandParent && grandParent.left === parent){
                const uncle = grandParent.right;
                if(uncle && uncle.color === Colors.RED){
                    grandParent.color = Colors.RED;
                    parent.color = Colors.BLACK;
                    uncle.color = Colors.BLACK;
                    node = grandParent;
                } else {
                    // case B
                    if(node === parent.right){
                        this.rotationRR(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    // case C
                    this.rotationLL(grandParent);
                    parent.color = Colors.BLACK;
                    grandParent.color = Colors.RED;
                    node = parent;
                }
            } else {
                // case D
                if(grandParent && grandParent.right === parent){
                    const uncle = grandParent.left;
                    if(uncle && uncle.color === Colors.RED){
                        grandParent.color = Colors.RED;
                        parent.color = Colors.BLACK;
                        uncle.color = Colors.BLACK;
                        node = grandParent;
                    } else {
                        // case E
                        if(node === parent.left){
                            this.rotationLL(parent);
                            node = parent;
                            parent = node.parent;
                        }
                        // case F
                        this.rotationRR(grandParent);
}
                }
            }
        }
    }

    rotationLL(node){
        const tmp = node.left;
        node.left = tmp.right;
        if(tmp.right && tmp.right.key){
            tmp.right.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        } else {
            if(node === node.parent.left){
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.right = node;
        node.parent = tmp;
    }

    rotationRR(node){
        const tmp = node.right;
        node.right = tmp.left;
        if(tmp.left && tmp.left.key){
            tmp.left.parent = node;
        }
        tmp.parent = node.parent;
        if(!node.parent){
            this.root = tmp;
        } else {
            if(node === node.parent.left){
                node.parent.left = tmp;
            } else {
                node.parent.right = tmp;
            }
        }
        tmp.left = node;
        node.parent = tmp;
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