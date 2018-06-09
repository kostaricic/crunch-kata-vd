<template>
    <div class="main-container">
        <display-data
            :valueProp="surveyData2"
            :keyProp="['SURVEY DATA']"
            :depth="0"
            >
        </display-data>
    </div>
</template>

<script>

// import _get from 'lodash'
import * as _help_ from '../helpers'
import * as _path_ from '../check-service'
import _ from 'lodash'

export default {

    data () {
        return {
            order: require('./../../fixtures/order.json'),
            variables: require('./../../fixtures/variables.json'),
            surveyData: '',
            surveyData2: {}
        }
    },

    mounted () {
        this.surveyData = this.mergePairs(this.order.graph, this.variables['index'])
        this.surveyData2 = this.createSurvey(this.variables.index, this.order.graph)
        // this.exposeVariables(this.variables.index)
    },

    methods: {

        mergePairs (order, variables) {
            return order.map((item, index, arr) => {
                // if OBJECT
                if (_help_.isObj(item)) {
                    // key is computed value and values go recursively
                    return { [_help_.getObjKey(item)]: this.mergePairs(_help_.getObjValue(item), variables) }
                // if STRING
                } else if (_help_.isStr(item)) {
                    // replace string
                    // return _help_.get({"a": arr}, 'a.' + _help_.getPosition_str(arr, item))
                    return _help_.getIndexValue(item, variables)
                }
                return false
            })
        },

        createSurvey (variables, order) {
            let finalObj = {}
            for (let prop in variables) {
                let path = _path_.getPathArr(order, prop)
                let data = variables[prop]
                _.set(finalObj, path, data)
            }
            return finalObj
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
