<template>
  <div id="app">
    <Nav/>
    <router-view class="container"/>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootswatch/dist/lux/bootstrap.min.css";

import Nav from "@/components/Nav";
import ServiceWorker from "@/ServiceWorker";

ServiceWorker.init();

export default {
  components: { Nav },
  name: "App"
};
</script>

<style>
html {
  background: url(assets/background.jpg) #212531 no-repeat center center fixed;
  -webkit-background-size: cover !important;
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  background-size: cover !important;
  min-height: 100%;
}

body {
  background: none !important;
  min-height: 100%;
}

.bg-primary {
  background-color: #06101c !important;
}

.btn-primary {
  background-color: #0f1b29 !important;
}

a {
  color: #42b983;
}
</style>
