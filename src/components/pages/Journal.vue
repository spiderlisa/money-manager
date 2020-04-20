<template>
  <v-container>
    <v-row class="mx-md-12 px-lg-12">
      <v-col cols="3">
        <StatusCard :info="{ title: 'Balance', value: balance }" />
        <StatusCard :info="{ title: 'Expenses', value: expenses }" />
        <StatusCard :info="{ title: 'Income', value: income }" />

        <v-dialog width="370" v-model="addRecordDialog">
          <template v-slot:activator="{ on }">
            <v-btn depressed dark block color="accent" class="mt-4" v-on="on">
              Add record
            </v-btn>
          </template>

          <AddItem @close-dialog="addRecordDialog = false" />
        </v-dialog>
      </v-col>

      <v-col cols="9">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatusCard from "../parts/StatusCard.vue";
import AddItem from "../parts/AddItem.vue";
import DayView from "../parts/DayView.vue";
import { groupRecordsByDate } from "../../utils/records";

@Component({
  components: {
    StatusCard,
    AddItem,
    DayView
  }
})
export default class Journal extends Vue {
  addRecordDialog = false;

  beforeMount() {
    this.$store.dispatch("fetchJournal");
    this.$store.dispatch("fetchUserInfo");
  }

  get balance() {
    return this.$store.getters["balance"];
  }

  get income() {
    return this.$store.getters["currentMonthIncome"];
  }

  get expenses() {
    return this.$store.getters["currentMonthExpenses"];
  }

  get recordDays() {
    const journal = this.$store.getters["journal"];
    return journal ? groupRecordsByDate(journal) : null;
  }
}
</script>
