<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Rallye</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" exact>Scoreboard</b-nav-item>
          <b-nav-item to="/test">Test</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.hintModal right v-if="isAdmin">Tipp senden</b-nav-item>
          <b-nav-item v-b-modal.login right v-if="!isAdmin">Admin Login</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <Login/>
      <HintModal/>
    </b-container>
  </b-navbar>
</template>

<script>
import Login from "@/components/Login";
import HintModal from "@/components/HintModal";

export default {
  name: "Nav",
  components: { Login, HintModal },
  computed: {
    isAdmin() {
      return !!localStorage.token;
    }
  }
};
</script>

<style>
.navbar {
  padding: 0.5rem 1rem;
}
</style>
