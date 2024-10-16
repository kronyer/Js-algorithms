import { defaultCompare, Compare, swap, createNonSortedArray } from "../utils/index.js";

function bubbleSort(array,compareFn = defaultCompare){
    const { length } = array;
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length - 1; j++){
            if(compareFn(array[j],array[j+1]) === Compare.BIGGER_THAN){
                swap(array,j,j+1);
            }
        }
    }
    return array;
}

function modifiedBubbleSort(array,compareFn = defaultCompare){
    const { length } = array;
    for(let i = 0; i < length; i++){
        for(let j = 0; j < length - 1 - i; j++){
            if(compareFn(array[j],array[j+1]) === Compare.BIGGER_THAN){
                swap(array,j,j+1);
            }
        }
    }
    return array;
}



// const array = [5, 3, 8, 4, 2, 7, 1, 10, 6, 9];
// console.log('Array original:', array);

// const sortedArray = bubbleSort(array);
// console.log('Array ordenado:', sortedArray);

let array2 = createNonSortedArray(100000);
console.time('bubbleSort');
bubbleSort(array2);
console.timeEnd('bubbleSort');
console.log('Array ordenado:', array2);

let array3 = createNonSortedArray(100000);
console.time('modifiedBubbleSort');
modifiedBubbleSort(array3);
console.timeEnd('modifiedBubbleSort');
