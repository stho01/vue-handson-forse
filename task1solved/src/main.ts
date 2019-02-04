import "./css/main.scss";
import Vue from "vue";
import _Vue from "vue";
import App from "./App.vue";
import {RouteNames, router} from "./router";
import {Store} from "@/store/Store";

Vue.config.productionTip = false;

Vue.use((Vue: typeof _Vue) => {
  Vue.prototype.RouteNames = RouteNames;
});

Vue.use(Store);

new Vue({
  router,
  render: h => h(App),
})
.$mount('#app');
