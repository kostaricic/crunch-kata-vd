import Vue from 'vue'
import App from './App'

import recursiveComponent from './components/recursiveComponent'
import MainComponent from './components/MainComponent'

Vue.component('recursive-component', recursiveComponent)
Vue.component('main-component', MainComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
