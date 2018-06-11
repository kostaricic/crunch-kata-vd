import Vue from 'vue'
import App from './App'

import DisplayData from './components/DisplayData'
import MainComponent from './components/MainComponent'

Vue.component('display-data', DisplayData)
Vue.component('main-component', MainComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
