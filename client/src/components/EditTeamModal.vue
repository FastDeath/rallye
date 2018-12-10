<template>
  <b-modal
    ok-only
    ok-title="Speichern"
    ref="modal"
    title="Team bearbeiten"
    v-model="isVisible"
    v-if="team"
    @ok="save"
  >
    <p>Hier kann das Team bearbeitet werden.</p>
    <b-form @submit.stop.prevent="save">
      <b-form-group label="Teamname" label-for="inputTeamName">
        <b-form-input
          id="inputTeamName"
          v-model.trim="team.name"
          type="text"
          placeholder="Team XYZ"
        />
      </b-form-group>

      <b-form-group label="Mitglieder" label-for="inputTeamMembers">
        <b-form-input
          id="inputTeamMembers"
          v-model.trim="team.members"
          type="text"
          placeholder="Kaspar, Melchior, Balthasar ..."
        />
      </b-form-group>

      <label>Teamfarbe</label>
      <ChromePicker v-model="team.color"/>
    </b-form>
  </b-modal>
</template>

<script>
import { Api } from "@/api";
import { Chrome } from "vue-color";
export default {
  name: "EditTeamModal",
  props: ["team"],
  components: { ChromePicker: Chrome },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    save() {
      Api.put("teams/" + this.team._id, this.team)
        .then(res => {
          this.isVisible = false;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        });
    }
  }
};
</script>
