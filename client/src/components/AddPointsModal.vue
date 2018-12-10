<template>
  <b-modal
    ok-only
    ok-title="Vergeben"
    ref="modal"
    title="Punkte vergeben"
    v-model="isVisible"
    v-if="team"
    @ok="addPoints"
  >
    <p>
      Gib ein wie viel Punkte
      <strong>&quot;{{ team.name }}&quot;</strong> erhalten sollen.
      <br>
      <small>geht auch negativ ;)</small>
    </p>
    <b-form @submit.stop.prevent="addPoints">
      <!-- <b-form-group label="Punkte" label-for="inputPoints"></b-form-group> -->
      <b-row class="mt-1 mb-3">
        <b-col sm="5">
          <label for="inputPoints" class="my-2">Punkte:</label>
        </b-col>
        <b-col sm="7">
          <b-form-input id="inputPoints" v-model="points" type="number"/>
        </b-col>
      </b-row>

      <b-row class="my-1">
        <b-col sm="5">
          <label for="input-none" class="my-2">Aktuelle Punktzahl:</label>
        </b-col>
        <b-col sm="7">
          <h1>{{ team.score }}</h1>
        </b-col>
      </b-row>
      <b-row class="my-1">
        <b-col sm="5">
          <label for="input-none" class="my-2">Neue Punktzahl:</label>
        </b-col>
        <b-col sm="7">
          <h1>{{ (team.score + +points) }}</h1>
        </b-col>
      </b-row>
    </b-form>
    <!-- <b-form-input id="input-none" :state="null" type="text" placeholder="No validation"></b-form-input> -->
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
      isVisible: false,
      points: 0
    };
  },
  methods: {
    show() {
      this.points = 0;
      this.isVisible = true;
    },
    hide() {
      this.isVisible = false;
    },
    addPoints() {
      Api.post("teams/" + this.team._id + "/points", { points: +this.points })
        .then(res => {
          this.team.score = res.data.score;
          this.isVisible = false;
          this.points = 0;
        })
        .catch(err => {
          alert(err);
          console.error(err);
        });
    }
  }
};
</script>
