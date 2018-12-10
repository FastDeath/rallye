import Vue from "vue";
import Router from "vue-router";
import Scoreboard from "@/components/Scoreboard";
import Test from "@/components/Test";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Scoreboard",
      component: Scoreboard
    },
    {
      path: "/test",
      name: "Test",
      component: Test
    }
  ]
});
