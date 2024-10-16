import { defaultCompare, Compare, swap, createNonSortedArray,createRandomArray } from "../utils/index.js";


function countingSort(array){
    if(array.length < 2) return array;
    const maxValue = findMaxValue(array);
    const counts = new Array(maxValue + 1);
    array.forEach(element => {
        if(!counts[element]){
            counts[element] = 0;
        }
        counts[element]++;
    });
    let sortedIndex = 0;
    counts.forEach((count, i) => {
        while(count > 0){
            array[sortedIndex++] = i;
            count--;
        }
    });
    return array;
}

function findMaxValue(array){
    let max = array[0];
    for(let i = 1; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
        }
    }
    return max;
}


let array2 = createNonSortedArray(100000);
let arrayRandom = createRandomArray(100000, 100000);

console.time('countingSort');
countingSort(arrayRandom);
console.timeEnd('countingSort');
console.log('Array ordenado:', arrayRandom);