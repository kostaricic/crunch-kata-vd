function getPosition_str(order, val, path = '', result = []) {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (this.isObj(item)) {
            // Concatenate to the path object key as a string
            path += `[${index}]['${this.getObjKey(item)}']`
            // Recursion with the object Value, passing all parameters
            this.getPosition_str(this.getObjValue(item), val, path, result)
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
        let num = this.getObjKey(item)[0].length
        // if current item is not string, trim path from the end by length of the previously added string + extra for the "[item]"
        // else, if's string just trim the "[item]"
        !this.isStr(item) ? path = this.trimEnd(path, num, 7) : path = this.trimEnd(path, 0, 3)
    }
    return result
}

function getPosition_arr(order, val, path = [], result = []) {
    // looping through the Array
    for (let [index, item] of order.entries()) {
        // if it's Object
        if (this.isObj(item)) {
            // push object's key
            path.push(index, String(this.getObjKey(item)))
            // Recursion with the object Value, passing all parameters
            this.getPosition_arr(this.getObjValue(item), val, path, result)
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
        // if current item is not string, splice last two elements, otherwise
        !this.isStr(item) ? path.splice(-2, 2) : path.splice(-1, 1)
    }
    return result
}

module.exports = {

}
