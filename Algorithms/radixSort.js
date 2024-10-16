import { defaultCompare, Compare, swap, createNonSortedArray, createRandomArray } from "../utils/index.js";

function radixSort(array, radixBase = 10) {
    if (array.length < 2) return array;
    const { minValue, maxValue } = findMinMaxValue(array);
    let significantDigit = 1;
    while ((maxValue - minValue) / significantDigit >= 1) {
        array = countingSortForRadix(array, radixBase, significantDigit, minValue);
        significantDigit *= radixBase;
    }
    return array;
}

function countingSortForRadix(array, radixBase, significantDigit, minValue) {
    let bucketsIndex;
    const buckets = [];
    const aux = [];
    for (let i = 0; i < radixBase; i++) {
        buckets[i] = 0;
    }
    for (let i = 0; i < array.length; i++) {
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
        buckets[bucketsIndex]++;
    }
    for (let i = 1; i < radixBase; i++) {
        buckets[i] += buckets[i - 1];
    }
    for (let i = array.length - 1; i >= 0; i--) {
        bucketsIndex = Math.floor(((array[i] - minValue) / significantDigit) % radixBase);
        aux[--buckets[bucketsIndex]] = array[i];
    }
    for (let i = 0; i < array.length; i++) {
        array[i] = aux[i];
    }
    return array;
}

function findMinMaxValue(array) {
    let minValue = array[0];
    let maxValue = array[0];
    for (let i = 1; i < array.length; i++) {
        if (array[i] < minValue) {
            minValue = array[i];
        }
        if (array[i] > maxValue) {
            maxValue = array[i];
        }
    }
    return { minValue, maxValue };
}

let array2 = createNonSortedArray(100000);
let arrayRandom = createRandomArray(100000, 100000);

console.time('radixSort');
// arrayRandom = radixSort(arrayRandom, 16); // Atualiza o array original com o array ordenado
// arrayRandom = radixSort(arrayRandom, 2); // Atualiza o array original com o array ordenado
arrayRandom = radixSort(arrayRandom, 100000); // Atualiza o array original com o array ordenado
console.timeEnd('radixSort');
console.log('Array ordenado:', arrayRandom);