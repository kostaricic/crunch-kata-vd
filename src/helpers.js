//  Helper functions

export function trimEnd (str, chunk, extra) {
    return str.slice(0, (chunk - chunk * 2 - extra))
}

export function getIndexValue (str, index) {
    return index[str]
}

export function getObjKey (obj) {
    return Object.keys(obj)
}

export function getObjValue (obj) {
    return obj[Object.keys(obj)]
}

export function isObj (obj) {
    if (typeof obj === 'object' && !Array.isArray(obj)) {
        return true
    }
    return false
}

export function isArr (arr) {
    if (Array.isArray(arr)) {
        // if not empty array
        return arr.length > 0
    }
    return false
}

export function isStr (str) {
    if (typeof str === 'string') {
        // if not empty string
        return str.length > 1
    }
    return false
}

export function ranNum (num) {
    return Math.round(Math.random() * num)
}
