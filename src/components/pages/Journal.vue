<template
  ><div>
    <div v-if="recordDays">
      <template v-for="(day, k) in recordDays">
        <DayView :key="k" :day="day" />
      </template>
    </div>
    <v-card v-else flat class="elevation-2">
      <v-card-text>
        You don't have any financial records yet.
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DayView from "../parts/DayView.vue";
import { groupRecordsByDate } from "../../utils/records";

@Component({
  name: "Journal",
  components: {
    DayView
  }
})
export default class Journal extends Vue {
  beforeMount() {
    this.$store.dispatch("fetchJournal");
  }

  get recordDays() {
    const journal = this.$store.getters["journal"];
    return journal ? groupRecordsByDate(journal) : null;
  }
}
</script>
