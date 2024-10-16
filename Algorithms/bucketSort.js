import { defaultCompare, Compare, swap, createNonSortedArray, createRandomArray } from "../utils/index.js";
import insertionSort from "./insertionSort.js";

function bucketSort(array, bucketSize = 5) {
    if (array.length < 2) return array;
    const buckets = createBuckets(array, bucketSize);
    return sortBuckets(buckets);
}

function createBuckets(array, bucketSize) {
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        } else if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
    const buckets = [];
    for (let i = 0; i < bucketCount; i++) {
        buckets[i] = [];
    }
    for (let i = 0; i < array.length; i++) {
        const bucketIndex = Math.floor((array[i] - minValue) / bucketSize);
        buckets[bucketIndex].push(array[i]);
    }
    return buckets;
}

function sortBuckets(buckets) {
    const sortedArray = [];
    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i] != null) {
            insertionSort(buckets[i]);
            sortedArray.push(...buckets[i]);
        }
    }
    return sortedArray;
}

let array2 = createNonSortedArray(100000);
let arrayRandom = createRandomArray(100000, 100000);

console.time('bucketSort');
arrayRandom = bucketSort(arrayRandom); // Atualiza o array original com o array ordenado
console.timeEnd('bucketSort');
console.log('Array ordenado:', arrayRandom);