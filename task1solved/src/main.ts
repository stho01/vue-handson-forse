import "./css/main.scss";
import Vue from "vue";
import _Vue from "vue";
import App from "./App.vue";
import {RouteNames, router} from "./router";

Vue.config.productionTip = false;

Vue.use((Vue: typeof _Vue) => {
  // Inject Route Names to Vue Rendering context.
  Vue.prototype.RouteNames = RouteNames;
});

new Vue({
  router,
  render: h => h(App),
})
.$mount('#app');
