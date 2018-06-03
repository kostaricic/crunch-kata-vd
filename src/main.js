import Vue from 'vue'
import App from './App'

import displayComponent from './components/displayComponent'
import MainComponent from './components/MainComponent'

Vue.component('display-data', displayComponent)
Vue.component('main-component', MainComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
