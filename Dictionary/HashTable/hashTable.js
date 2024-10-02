import { defaultToString } from "../../utils/index.js";


class HashTable {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }

    loseloseHashCode(key) {
        if (typeof key === 'number') {
            return key;
        }
        const tableKey = this.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
            hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    
    hashCode(key) {
        return this.loseloseHashCode(key);
    }

    put (key, value) {
        if (key != null && value != null) {
            const position = this.hashCode(key);
            this.table[position] = value;
            return true;
        }
        return false;
    }

    get (key) {
        const position = this.hashCode(key);
        return this.table[position];
    }

    remove (key) {
        const hash = this.hashCode(key);
        const value = this.table[hash];
        if (value != null) {
            delete this.table[hash];
            return true;
        }
        return false;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const keys = Object.keys(this.table);
        let objString = `{${keys[0]} => ${this.table[keys[0]]}}`;
        for (let i = 1; i < keys.length; i++) {
            objString = `${objString}, {${keys[i]} => ${this.table[keys[i]]}}`;
        }
        return objString;
    }

}


const hash = new HashTable();
hash.put('Gandalf', 'gand@gmail.com');
hash.put('John', 'jho@gmail.com');
hash.put('Tyrion', 'tyr@gmail.com');
console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

console.log(hash.get('Gandalf'));
console.log(hash.get('Pedro'));
hash.remove('Gandalf');
console.log(hash.get('Gandalf'));

