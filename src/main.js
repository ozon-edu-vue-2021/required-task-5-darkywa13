import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./router/index";
import storeData from "./store/index";
import "normalize.css/normalize.css";
import { currency } from "./filters/currency";
// понятно, конечно, что тащить все иконки не стоит
import "material-icons/iconfont/material-icons.css";

Vue.use(Vuex);
Vue.use(VueRouter);

Vue.filter("currency", currency);

Vue.config.productionTip = false;
const router = new VueRouter({
  mode: "history",
  routes,
});
const store = new Vuex.Store(storeData);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
