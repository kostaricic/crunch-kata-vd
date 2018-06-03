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
            surveyData: ''
        }
    },

    created () {
        // console.log(_.get(this.order, "graph[0]['Awareness Metrics'][0]['Coffee'][0]"));
    },

    mounted () {
        this.surveyData = this.getPosition(this.order.graph, 'c83da2')
    },

    methods: {

        getPosition (order, val, path = '', result = []) {
            // looping through the Array
            for (let [index, x] of order.entries()) {
                // if is Object
                if (this.isObj(x)) {
                    // Concatenate to the path object key as a string
                    path += `[${index}]['${this.getObjKey(x)}']`
                    // Recursion with the object Value, passing all parameters
                    this.getPosition(this.getObjValue(x), val, path, result)
                //  if not an Object (string it is)
                } else {
                    // concatenate index number as a string
                    path += `[${index}]`
                    // if choosen value === current item
                    if (val === x) {
                        // push path to the final result
                        result.push(path)
                    }
                }
                // Declaring variable to store length of current Objects key
                let num = this.getObjKey(x)[0].length
                // typeof x !== 'string' ? path = path.slice(0, (num - num * 2 - 7)) : path = path.slice(0, -3)
                // !this.isStr(x) ? path = path.slice(0, (num - num * 2 - 7)) : path = path.slice(0, -3)

                // if current item is not string, trim path from the end by length of the previously added string + extra for the "[x]"
                // else, if's string just trim the "[x]"
                !this.isStr(x) ? path = this.trimEnd(path, num, 7) : path = this.trimEnd(path, 0, 3)
            }
            return result
        },

        // Helper functions

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
