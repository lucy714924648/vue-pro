import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.config.devtools = true;
// 仅在生产环境禁用调试工具
// Vue.config.devtools = process.env.NODE_ENV !== 'production'


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
