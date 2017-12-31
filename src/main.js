import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-default/index.css';    // 默认主题
import 'mint-ui/lib/style.css';
import "babel-polyfill";
import Mint from 'mint-ui';
Vue.use(Mint); 
Vue.use(ElementUI);
Vue.use(VueClipboard)
Vue.prototype.$axios = axios;
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');