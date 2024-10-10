import { defaultCompare, swap } from "../utils";

export class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }

    getLeftIndex(index) {
        return 2 * index + 1;
    }

    getRightIndex(index) {
        return 2 * index + 2;
    }

    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }

    insert(value) {
        if (value != null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (index > 0 && this.compareFn(this.heap[parent], this.heap[index]) === 1) {
            this.swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size() === 1) {
            return this.heap.shift();
        }
        const removedValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.siftDown(0);
        return removedValue;
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
        if (left < size && this.compareFn(this.heap[element], this.heap[left]) === 1) {
            element = left;
        }
        if (right < size && this.compareFn(this.heap[element], this.heap[right]) === 1) {
            element = right;
        }
        if (index !== element) {
            this.swap(this.heap, index, element);
            this.siftDown(element);
        }
    }
}