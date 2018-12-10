<template>
  <div class="hello">
    <h2 class="mt-5">Die Teams</h2>
    <Scores class="mt-3"/>
    <!-- <router-link to="/test">test</router-link>
    <pre>{{res}}</pre>
    <pre>{{errors}}</pre>-->
  </div>
</template>

<script>
import { Api } from "@/api";
import Scores from "@/components/Scores";

export default {
  name: "Scoreboard",
  components: { Scores },
  data() {
    return {
      res: null,
      errors: []
    };
  },
  mounted() {
    Api.get("status")
      .then(res => {
        this.res = res.data;
      })
      .catch(err => {
        this.errors.push(err);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  color: rgba(255, 255, 255, 0.85) !important;
}
/* ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
} */
</style>
