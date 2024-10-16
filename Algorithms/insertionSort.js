import { defaultCompare, Compare, swap, createNonSortedArray } from "../utils/index.js";

export default function insertionSort(array, compareFn = defaultCompare) {
    const { length } = array;
    let temp;
    for (let i = 1; i < length; i++) {
        let j = i;
        temp = array[i];
        while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
        array[j] = array[j - 1];
        j--;
        }
        array[j] = temp;
    }
    return array;
    }

    let array2 = createNonSortedArray(100000);
console.time('insertionSort');
insertionSort(array2);
console.timeEnd('insertionSort');
console.log('Array ordenado:', array2);