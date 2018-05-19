<template>
    <div>
        hej hej
    </div>
</template>

<script>
export default {
    data () {
        return {
            order: require('./../../fixtures/order.json'),
            variables: require('./../../fixtures/variables.json'),
            final: []
        }
    },

    mounted () {
        this.final = this.main(this.order.graph)
    },

    methods: {

        main (arr) {
            return arr.map(item => {
                // if OBJECT
                if (this.isObj(item)) {
                    // complicated :D [key is computed value and values go recursively ]
                    return { [this.getObjKey(item)]: this.main(this.getObjValue(item)) }
                // if ARRAY
                } else if (this.isArr(item)) {
                    // recursion
                    return this.main(item)
                // if STRING
                } else if (this.isStr(item)) {
                    // pair string
                    return item + ' yeaah'
                }
                return false
            })
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
                // if empty array return false, otherwise true
                return arr.length === 0 ? false : true
            }
            return false
        },

        isObj (obj) {
            // maybe empty obj?
            if (typeof obj === 'object') {
                return true
            }
            return false
        },

        isStr (str) {
            if (typeof str === 'string') {
                return true
            }
            return false
        }

    }
}
</script>
