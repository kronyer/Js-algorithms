import { defaultCompare, Compare, swap, createNonSortedArray } from "../utils/index.js";

function selectionSort(array, compareFn = defaultCompare) {
  const { length } = array;
    let minIndex;
    for (let i = 0; i < length - 1; i++) {
        minIndex = i;
        for (let j = i; j < length; j++) {
            if (compareFn(array[minIndex], array[j]) === Compare.BIGGER_THAN) {
                minIndex = j;
            }
        }
        if (i !== minIndex) {
            swap(array, i, minIndex);
        }
    }
  
}

let array2 = createNonSortedArray(100000);
console.time('selectionSort');
selectionSort(array2);
console.timeEnd('selectionSort');
console.log('Array ordenado:', array2);
