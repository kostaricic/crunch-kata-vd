<template>
    <div class="main-container">
        <recursive-component
            :valueProp="surveyData"
            :keyProp="['SURVEY DATA']"
            :depth="0"
            >
        </recursive-component>
    </div>
</template>

<script>

export default {

    data () {
        return {
            order: require('./../../fixtures/order.json'),
            variables: require('./../../fixtures/variables.json'),
            surveyData: ''
        }
    },

    mounted () {
        this.surveyData = this.mergePairs(this.order.graph)
    },

    methods: {

        mergePairs (order) {
            return order.map(item => {
                // if OBJECT
                if (this.isObj(item)) {
                    // complicated :) key is computed value and values go recursively
                    return { [this.getObjKey(item)]: this.mergePairs(this.getObjValue(item)) }
                // if ARRAY
                } else if (this.isArr(item)) {
                    // recursion
                    return this.mergePairs(item)
                // if STRING
                } else if (this.isStr(item)) {
                    // replace string
                    return this.getIndexValue(item, this.variables['index'])
                }
                return false
            })
        },

        // modifyObject(obj) {
        //     return {
        //         'label': Object.keys(obj)[0],
        //         'node': obj[Object.keys(obj)]
        //     }
        // },

        getIndexValue (str, index) {
            return index[str]
        },

        getObjValue (obj) {
            return obj[Object.keys(obj)]
        },

        getObjKey (obj) {
            return Object.keys(obj)
        },

        isArr (arr) {
            // maybe empty array?
            if (Array.isArray(arr)) {
                // if not empty array
                return arr.length > 0
            }
            return false
        },

        isObj (obj) {
            // maybe empty obj?
            if (typeof obj === 'object' && !Array.isArray(obj)) {
                return true
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
