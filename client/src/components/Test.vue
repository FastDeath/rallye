<template>
  <div>
    <h2 class="mt-5">Lel, stop looking at this</h2>
    <!-- <router-link to="/">main</router-link> -->
    <ul id="example-1">
      <li v-for="team in teams" :key="team._id">
        <pre class="text-info">{{ team }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import { Api } from "@/api";
export default {
  data() {
    return {
      teams: [],
      errors: []
    };
  },
  mounted() {
    Api.get("teams")
      .then(res => {
        this.teams = res.data.teams;
      })
      .catch(err => {
        this.errors.push(err);
      });
  }
};
</script>

<style scoped>
h1,
h2 {
  color: rgba(255, 255, 255, 0.85);
}
</style>
