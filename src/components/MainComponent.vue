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

import * as _help_ from '../helpers'
import * as _path_ from '../path-service'
import _ from 'lodash'

export default {

    data () {
        return {
            order: require('./../../fixtures/order.json'),
            variables: require('./../../fixtures/variables.json'),
            surveyData: '',
        }
    },

    mounted () {
        this.surveyData = this.createSurvey(this.variables.index, this.order.graph)
    },

    methods: {

        createSurvey (variables, order) {
            let finalObj = {}
            let paths = _path_.getAllPathsStr(order)
            for (let prop in variables) {
                let path = paths[prop]
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
