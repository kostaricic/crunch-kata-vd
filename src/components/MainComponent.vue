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
import * as _ from '../helpers'

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
        // this.surveyData = this.getPosition_str(this.order.graph, '0323cf')
        // this.surveyData2 = this.getPosition_arr(this.order.graph, '0323cf')
        this.test = this.mergePairs(this.order.graph, 'c83da2')
        // this.exposeVariables(this.variables.index)
    },

    methods: {

        mergePairs (order) {
            return order.map((item, index, arr) => {
                // if OBJECT
                if (_.isObj(item)) {
                    // key is computed value and values go recursively
                    return { [_.getObjKey(item)]: this.mergePairs(_.getObjValue(item)) }
                // if STRING
                } else if (_.isStr(item)) {
                    // replace string
                    // return _.get({"a": arr}, 'a.' + _.getPosition_str(arr, item))
                    return _.getIndexValue(item, this.variables['index'])
                }
                return false
            })
        },


    }
}
</script>

<style>
    .main-container {
        margin: auto;
        width: 640px;
    }
</style>
