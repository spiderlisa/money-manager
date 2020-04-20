<template>
  <v-card flat class="mb-3 elevation-2">
    <v-card-title>
      Profile
    </v-card-title>
    <v-divider />

    <v-card-text>
      <p>Email - {{ userEmail }}</p>
      <v-btn
        v-if="!passwordUpdateVisible"
        x-small
        @click="passwordUpdateVisible = true"
      >
        Change password
      </v-btn>

      <p>Categories</p>
      <div v-for="(category, k) in categories" :key="k">
        <div>{{ category.name }}</div>
        <div>
          {{ category.freq.toTitleCase }} budget - {{ category.budget }}
        </div>
        <div>Current expenses - {{ category.currentExpenses }}</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { fromSecondsToText } from "../../utils/date";

@Component({
  name: "UserProfile",
  components: {
    //
  }
})
export default class UserProfile extends Vue {
  beforeMount() {
    this.$store.dispatch("fetchUserInfo");
  }

  get userEmail() {
    return this.$store.getters["email"];
  }

  get categories() {
    return this.$store.getters["categories"];
  }

  passwordUpdateVisible = false;

  prettyDate = (date: number) => fromSecondsToText(date);

  toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>
