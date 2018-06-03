<template>
    <div class="main-container">
        <display-data
            :valueProp="surveyData"
            :keyProp="['SURVEY DATA']"
            :depth="0"
            >
        </display-data>
    </div>
</template>

<script>

import _get from 'lodash'

export default {

    data () {
        return {
            order: require('./../../fixtures/order.json'),
            variables: require('./../../fixtures/variables.json'),
            surveyData: '',
            surveyData2: '',
            test: ''
        }
    },

    created () {
        // console.log(_.get(this.order, "graph[0]['Awareness Metrics'][0]['Coffee'][0]"));
    },

    mounted () {
        this.surveyData = this.getPosition_str(this.order.graph, '0323cf')
        this.surveyData2 = this.getPosition_arr(this.order.graph, '0323cf')
        this.test = this.mergePairs(this.order.graph, 'c83da2')
        // this.exposeVariables(this.variables.index)
    },

    methods: {

        mergePairs (order) {
            return order.map((item, index) => {
                // if OBJECT
                if (this.isObj(item)) {
                    // key is computed value and values go recursively
                    return { [this.getObjKey(item)]: this.mergePairs(this.getObjValue(item)) }
                // if STRING
                } else if (this.isStr(item)) {
                    // replace string
                    return this.getIndexValue(item, this.variables['index'])
                }
                return false
            })
        },

        getPosition_str (order, val, path = '', result = []) {
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
        },

        getPosition_arr (order, val, path = [], result = []) {
            for (let [index, item] of order.entries()) {
                if (this.isObj(item)) {
                    path.push(index, String(this.getObjKey(item)))
                    this.getPosition_arr(this.getObjValue(item), val, path, result)
                } else {
                    path.push(index)
                    if (val === item) {
                        path.forEach(element => {
                            result.push(element)
                        })
                        return result
                    }
                }
                !this.isStr(item) ? path.splice(-2, 2) : path.splice(-1, 1)
            }
            // return result
        },

        //  Helper functions

        trimEnd (str, chunk, extra) {
            return str.slice(0, (chunk - chunk * 2 - extra))
        },

        getIndexValue (str, index) {
            return index[str]
        },

        getObjValue (obj) {
            return obj[Object.keys(obj)]
        },

        getObjKey (obj) {
            return Object.keys(obj)
        },

        isObj (obj) {
            if (typeof obj === 'object' && !Array.isArray(obj)) {
                return true
            }
            return false
        },
        isArr (arr) {
            if (Array.isArray(arr)) {
                // if not empty array
                return arr.length > 0
            }
            return false
        },

        isStr (str) {
            if (typeof str === 'string') {
                // if not empty string
                return str.length > 1
            }
            return false
        }
    }
}
</script>

<style>
    .main-container {
        margin: auto;
        width: 640px;
    }
</style>
