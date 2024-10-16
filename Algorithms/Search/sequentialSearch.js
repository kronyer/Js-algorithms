import { defaultEquals,  } from "../utils/index.js";


const DOES_NOT_EXIST = -1;
function sequentialSearch(array, value, equalsFn = defaultEquals) {
    for (let i = 0; i < array.length; i++) {
        if (equalsFn(array[i], value)) {
            return i;
        }
    }
    return DOES_NOT_EXIST;
}