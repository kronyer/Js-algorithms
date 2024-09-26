class Set {
  constructor() {
    this.items = {};
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  delete(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    // return element in items; 
    return Object.prototype.hasOwnProperty.call(this.items, element); //maneira melhor
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  sizeLegacy() {
    let count = 0;
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }

  values() {
    return Object.values(this.items);
  }

    valuesLegacy() {
        let values = [];
        for (let key in this.items) {
        if (this.items.hasOwnProperty(key)) {
            values.push(key);
        }
        }
        return values;
    }

    union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
    }

    intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
        biggerSet = otherValues;
        smallerSet = values;
        }
        smallerSet.forEach(value => {
        if (biggerSet.includes(value)) {
            intersectionSet.add(value);
        }
        });
        return intersectionSet;
    }

    difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
        if (!otherSet.has(value)) {
            differenceSet.add(value);
        }
        });
        return differenceSet;
    }

    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
        return false;
        }
        let isSubset = true;
        this.values().every(value => {
        if (!otherSet.has(value)) {
            isSubset = false;
            return false;
        }
        return true;
        });
        return isSubset;
    }
}

// const set = new Set();
// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());
// set.add(2);
// console.log(set.values());
// console.log(set.has(2));
// console.log(set.size());
// set.delete(1);
// console.log(set.values());
// set.delete(2);
// console.log(set.values());

// const setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
// const setB = new Set();
// setB.add(3);
// setB.add(4);
// setB.add(5);
// setB.add(6);
// const unionAB = setA.union(setB);
// console.log(unionAB.values());

// const setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
// const setB = new Set();
// setB.add(2);
// setB.add(3);
// setB.add(4);
// const intersectionAB = setA.intersection(setB);
// console.log(intersectionAB.values()); // [2, 3]

// const setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
// const setB = new Set();
// setB.add(2);
// setB.add(3);
// setB.add(4);
// const differenceAB = setA.difference(setB);
// console.log(differenceAB.values()); // [1]

const setA = new Set();
setA.add(1);
setA.add(2);
const setB = new Set();
setB.add(1);
setB.add(2);
setB.add(3);
const setC = new Set();
setC.add(2);
setC.add(3);
setC.add(4);
console.log(setA.isSubsetOf(setB)); //true
console.log(setA.isSubsetOf(setC)); // false
