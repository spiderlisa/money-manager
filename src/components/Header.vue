<template>
  <v-app-bar flat color="secondary">
    <v-toolbar-title>Money Manager</v-toolbar-title>

    <v-spacer />

    <v-btn v-if="loggedIn" text @click="logout">
      Log out
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Header"
})
export default class Header extends Vue {
  logout() {
    this.$store.dispatch("logout");
    this.$router.push("/login");
  }

  get loggedIn() {
    const email = this.$store.getters["email"];
    return !!email;
  }
}
</script>

<style scoped></style>
