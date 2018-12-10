<template>
  <b-modal
    ok-only
    ok-title="Senden"
    ref="modal"
    id="hintModal"
    title="Tipp an alle Teams senden"
    @ok="send"
    @hide="hide"
  >
    <b-form @submit.stop.prevent="send">
      <p>Hier kannst du eine Nachricht an alle verschicken.</p>
      <b-form-input v-model="message" type="text" placeholder="Nachricht"/>
    </b-form>
    <p v-if="success" class="text-success mt-2">Erfolgreich versandt an {{ reach }} Geräte :)</p>
  </b-modal>
</template>

<script>
import { Api } from "@/api";

export default {
  name: "HintModal",
  data() {
    return {
      error: false,
      message: "",
      success: false,
      reach: 0
    };
  },
  mounted() {},
  methods: {
    send(e) {
      e.preventDefault();
      this.success = false;
      this.reach = 0;

      Api.post("teams/hint", { message: this.message })
        .then(res => {
          console.log(res);
          this.reach = res.data.reach;
          this.success = true;
          this.message = "";
        })
        .catch(err => {
          alert(err);
          this.error = true;
        });
    },
    hide() {
      this.message = "";
    }
  }
};
</script>
