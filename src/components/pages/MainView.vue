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
        <router-view />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import StatusCard from "../small/StatusCard.vue";
import AddItem from "../parts/AddItem.vue";

@Component({
  name: "MainView",
  components: {
    StatusCard,
    AddItem
  }
})
export default class MainView extends Vue {
  addRecordDialog = false;

  beforeMount() {
    this.$store.dispatch("fetchUserInfo");
    this.$store.dispatch("fetchJournal");
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
}
</script>
