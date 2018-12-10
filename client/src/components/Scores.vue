<template>
  <div>
    <table class="table scoreboard d-none d-md-table">
      <thead>
        <tr>
          <th scope="col" class="col-rank">Rang</th>
          <th scope="col" class="col-teamname">Team</th>
          <th scope="col" class="col-score text-right">Punkte</th>
          <th scope="col" class="col-actions text-right" v-if="isAdmin">Administration</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-active"
          :class="{'team-best': team.score > 0 && team.score == highestScore }"
          v-for="(team,k) in teams"
          :key="team._id"
        >
          <th scope="row" class="text-center">
            <h2 class="team-rank">#{{ k+1 }}</h2>
          </th>
          <td>
            <h5 class="team-name">{{ team.name }}</h5>
            <span class="team-members">{{ team.members }}</span>
            <div class="progress mt-1 team-progress">
              <div
                class="progress-bar bg-info team-bar"
                role="progressbar"
                :style="{
                width: `${team.score/total*100}%`,
                'background-color': (team.color.hex || team.color) + ' !important',
                'box-shadow': '0 0 8px -1px ' + (team.color.hex || team.color)
              }"
                :aria-valuenow="team.score"
                aria-valuemin="0"
                :aria-valuemax="total"
              ></div>
            </div>
          </td>
          <td class="text-right">
            <div class="score my-1 mr-4">
              <h4 class="team-score">{{ team.score }}</h4>
              <h3 class="score-divider">/</h3>
              <span class="score-total">{{ total }}</span>
            </div>
          </td>
          <td class="py-3 text-right" v-if="isAdmin">
            <!-- <button class="btn btn-sm btn-primary mt-1">+ PT</button> -->
            <b-button-toolbar key-nav class="pull-right" aria-label="Admin actions">
              <b-btn class="ml-2" variant="primary" @click="addPoints(team)">+ PT</b-btn>
              <b-btn class="ml-2" variant="primary" @click="editTeam(team)">Edit</b-btn>
            </b-button-toolbar>
          </td>
        </tr>
      </tbody>
    </table>

    <b-card
      no-body
      class="text-center mb-2 d-md-none team-card"
      :class="{'team-best': team.score > 0 && team.score == highestScore}"
      bg-variant="primary"
      v-for="(team,k) in teams"
      :key="team._id"
    >
      <b-card-body class="d-flex">
        <h2 class="team-rank d-inline-block">#{{ k+1 }}</h2>

        <div class="text-left d-block ml-4 flex-grow-1">
          <div class="score score-sm float-right mr-4">
            <h5 class="team-score">{{ team.score }}</h5>
            <h5 class="score-divider">/</h5>
            <span class="score-total">{{ total }}</span>
          </div>
          <h5 class="team-name d-block">{{ team.name }}</h5>
          <div class="team-members">{{ team.members }}</div>
          <div class="progress mt-1 team-progress">
            <div
              class="progress-bar bg-info team-bar"
              role="progressbar"
              :style="{
                width: `${team.score/total*100}%`,
                'background-color': (team.color.hex || team.color) + ' !important',
                'box-shadow': '0 0 8px -1px ' + (team.color.hex || team.color)
              }"
              :aria-valuenow="team.score"
              aria-valuemin="0"
              :aria-valuemax="total"
            ></div>
          </div>
        </div>
      </b-card-body>
    </b-card>

    <EditTeamModal ref="editTeamModal" :team="selectedTeam"/>
    <AddPointsModal ref="addPointsModal" :team="selectedTeam"/>
  </div>
</template>

<script>
import { Api } from "@/api";
// import { EventBus } from "@/EventBus";

import EditTeamModal from "@/components/EditTeamModal";
import AddPointsModal from "@/components/AddPointsModal";

export default {
  name: "Scores",
  components: { EditTeamModal, AddPointsModal },
  data() {
    return {
      total: 70,
      teams: [],
      colors: { r: 0, g: 0, b: 0 },
      selectedTeam: null
    };
  },
  computed: {
    isAdmin() {
      return !!localStorage.token;
    },
    bestTeam() {
      return this.teams.reduce((max, cur) => {
        if (!max) return cur;
        if (cur.score > max.score) return cur;
        return max;
      });
    },
    highestScore() {
      return this.teams.reduce((max, cur) => Math.max(max, cur.score), 0);
    }
  },
  mounted() {
    // console.log(EventBus);
    // EventBus.$on("ServiceWorkerMessage", e => {
    //   console.log("sw says", e);
    // });

    Api.get("teams")
      .then(res => {
        this.teams = res.data.teams;
      })
      .catch(err => {
        console.error(err);
        this.errors.push(err);
      });
  },
  methods: {
    editTeam(team) {
      this.selectedTeam = team;
      this.$refs.editTeamModal.show();
    },
    addPoints(team) {
      this.selectedTeam = team;
      this.$refs.addPointsModal.show();
    }
  }
};
</script>

<style scoped>
.bg-primary,
.scoreboard {
  background: rgba(4, 10, 16, 0.6) !important;
}

thead {
  color: rgb(255, 255, 255);
}

.scoreboard th {
  padding: 0.75rem 1.5rem;
}

.col-rank {
  width: 9%;
}

.col-teamname {
  width: 50%;
}

.col-score {
  width: 11%;
}

.col-actions {
  width: 30%;
}

.progress {
  height: 8px;
  border-radius: 4px;
  background: rgba(102, 178, 255, 0.1);
}

.team-name {
  margin: 0;
  display: inline-block;
}

table.scoreboard .team-name::after {
  content: " ⫽";
  color: #919aa1;
}

.team-members {
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.team-rank {
  margin: 14px 0;
}

.score {
  position: relative;
  display: inline-block;
}

.team-score {
  margin: 0;
}

.score-total {
  position: absolute;
  top: 10px;
  right: -25px;
  white-space: nowrap;
  color: white;
  opacity: 0.7;
}

.score-divider {
  position: absolute;
  top: 2px;
  right: -8px;
  opacity: 0.8;
}

.score-sm .score-total {
  top: 5px;
  right: -24px;
  font-size: 0.9em;
}

.score-sm .score-divider {
  top: 2px;
  right: -7px;
}

.team-progress {
  overflow: visible;
  margin: 0;
}

.team-bar {
  border-radius: 4px;
}

.team-card {
  overflow: hidden;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: white;
}

.team-best .team-name,
.team-best .team-rank,
.team-best .score * {
  color: rgb(255, 247, 130) !important;
  text-shadow: 0 0 8px rgba(255, 247, 130, 0.3);
}

.team-best .team-name::before {
  position: absolute;
  content: "★";
  display: inline-block;
  /* margin-right: 4px; */
  margin-left: -22px;
  width: 19px;
  /* width: 1200px; */
  /* font-size: 1000px; */
  text-align: center;
  animation: starinate 2s linear infinite;
  -webkit-animation: starinate 2s linear infinite;
}

@keyframes starinate {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes starinate {
  0% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(1.25);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
</style>
