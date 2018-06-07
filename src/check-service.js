
import * as _ from './helpers'

// acces deeply nested values
// https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
export const get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)

export function getPathArr (order, val, path = [], result = []) {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (_.isObj(item)) {
            // push object's key
            path.push(index, String(_.getObjKey(item)))
            // Recursion with the object Value, passing all parameters
            getPathArr(_.getObjValue(item), val, path, result)
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
        !_.isStr(item) ? path.splice(-2, 2) : path.splice(-1, 1)
    }
    return result
}

export function getPathStr (order, val, path = '', result = []) {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (_.isObj(item)) {
            // Concatenate to the path object key as a string
            path += `[${index}]['${_.getObjKey(item)}']`
            // Recursion with the object Value, passing all parameters
            getPathStr(_.getObjValue(item), val, path, result)
        //  if not an Object (string it is)
        } else {
            // concatenate index number as a string
            path += `[${index}]`
            // if choosen value === current item
            if (val === item) {
                // push path to the final result
                result.push(path)
            }
        }
        // Declaring variable to store length of current Objects key
        let num = _.getObjKey(item)[0].length
        // if current item is not string, trim path from the end by length of the previously added string + extra for the "[item]"
        // else, if's string just trim the "[item]"
        !_.isStr(item) ? path = _.trimEnd(path, num, 7) : path = _.trimEnd(path, 0, 3)
    }
    return result
}
