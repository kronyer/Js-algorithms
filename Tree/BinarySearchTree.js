import {Compare, defaultCompare} from "../utils/index.js"   // {1}
import {Node} from "../models/node.js"   // {2}

export default class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;   // {3}
        this.root = null;   // {4}
    }

    insert(key) {
        if (this.root == null) {   // {5}
            this.root = new Node(key);   // {6}
        } else {
            this.insertNode(this.root, key);   // {7}
        }
    }

    insertNode(node, key) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {   // {8}
            if (node.left == null) {   // {9}
                node.left = new Node(key);   // {10}
            } else {
                this.insertNode(node.left, key);   // {11}
            }
        } else {
            if (node.right == null) {   // {12}
                node.right = new Node(key);   // {13}
            } else {
                this.insertNode(node.right, key);   // {14}
            }
        }
    }

}