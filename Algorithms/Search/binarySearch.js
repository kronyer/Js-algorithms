import { defaultCompare } from "../../utils";

function binarySearch(array, value, compareFn = defaultCompare){
    const sortedArray = array.sort(compareFn);
    let low = 0;
    let high = sortedArray.length - 1;
    while(low <= high){
        const mid = Math.floor((low + high) / 2);
        const element = sortedArray[mid];
        if(compareFn(element, value) === -1){
            low = mid + 1;
        } else if(compareFn(element, value) === 1){
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}