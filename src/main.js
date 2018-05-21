import Vue from 'vue'
import App from './App'

import CrunchComponent from './components/CrunchComponent'
import MainComponent from './components/MainComponent'

Vue.component('crunch-component', CrunchComponent)
Vue.component('main-component', MainComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    render: h => h(App)
})
