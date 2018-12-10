// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import BootstrapVue from "bootstrap-vue";

// this is awful..
window.vapidPublicKey = new Uint8Array([
  4,
  144,
  190,
  244,
  107,
  91,
  145,
  63,
  165,
  43,
  198,
  100,
  76,
  243,
  252,
  15,
  223,
  13,
  32,
  162,
  200,
  140,
  181,
  6,
  23,
  128,
  122,
  214,
  149,
  109,
  161,
  204,
  227,
  102,
  77,
  94,
  183,
  136,
  86,
  162,
  161,
  239,
  173,
  34,
  113,
  135,
  44,
  138,
  119,
  151,
  35,
  50,
  81,
  187,
  79,
  119,
  176,
  124,
  151,
  140,
  27,
  244,
  118,
  144,
  214
]);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

/* eslint-disable no-new */
export default new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
