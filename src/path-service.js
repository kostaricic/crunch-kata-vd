
import * as _v_ from './helpers'

export const getPathArr = (order, val, path = [], result = []) => {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (_v_.isObj(item)) {
            // push object's key
            path.push(index, String(_v_.getObjKey(item)))
            // Recursion with the object Value, passing all parameters
            getPathArr(_v_.getObjValue(item), val, path, result)
        // if not an Object
        } else {
            // push index to the path Array
            path.push(index)
            // if choosen value === current item
            if (val === item) {
                // push path to the result
                path.forEach(element => {
                    result.push(element)
                })
                // return result
            }
        }
        // if current item is not string, splice last two elements, otherwise splice one element
        !_v_.isStr(item) ? path.splice(-2, 2) : path.splice(-1, 1)
    }
    return result
}

export function getAllPathsStr (order, path = '', result = {}) {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (_v_.isObj(item)) {
            // Concatenate to the path object key as a string
            path += `[${index}]['${_v_.getObjKey(item)}']`
            // if objValue is Array then Recursion with the object Value, passing all parameters, otherwise make path
            // _v_.isArr(_v_.getObjValue(item)) ? getAllPathsStr(_v_.getObjValue(item), path, result) : result[_v_.getObjValue(item)] = path
            getAllPathsStr(_v_.getObjValue(item), path, result)
        //  if not an Object (string it is)
        } else {
            // concatenate index number as a string
            path += `[${index}]`
            // make key (index) : value (path)
            result[item] = path
        }
        // Declaring variable to store length of current Objects key
        let num = _v_.getObjKey(item)[0].length
        // if current item is not string, trim path from the end by length of the previously added string + extra for the "[item]"
        // else, if's string just trim the "[item]"
        !_v_.isStr(item) ? path = _v_.trimEnd(path, num, 7) : path = _v_.trimEnd(path, 0, 3)
    }
    return result
}
