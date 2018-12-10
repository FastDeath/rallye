<template>
  <b-modal ok-title="Einloggen" ref="modal" id="login" title="Admin Login" @ok="login" @hide="hide">
    <b-form @submit.stop.prevent="login">
      <p>Einloggen? Kann man schonmal machen...</p>
      <b-form-input v-model="password" type="password" placeholder="Passwort"/>
    </b-form>
  </b-modal>
</template>

<script>
import { Api } from "@/api";

export default {
  name: "Login",
  data() {
    return {
      error: false,
      password: ""
    };
  },
  mounted() {},
  methods: {
    login(e) {
      e.preventDefault();

      Api.post("auth", { password: this.password })
        .then(res => {
          console.log(res, Api);
          localStorage.token = res.data.token;

          this.$refs.modal.hide();
          location.reload();
        })
        .catch(err => {
          alert(err);
          this.error = true;
        });
    },
    hide() {
      this.password = "";
    }
  }
};
</script>
