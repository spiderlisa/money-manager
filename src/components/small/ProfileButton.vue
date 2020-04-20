<template>
  <v-menu
    v-if="loggedIn"
    v-model="value"
    close-on-click
    close-on-content-click
    offset-y
    nudge-bottom="10"
    min-width="120"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="black" small icon class="mr-1" v-on="on">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <v-list-item key="profile" @click="openProfile">
        <v-list-item-title>Profile</v-list-item-title>
      </v-list-item>
      <v-list-item key="logout" @click="logout">
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "ProfileButton"
})
export default class ProfileButton extends Vue {
  value = false;

  openProfile() {
    this.value = false;
    this.$router.push("/profile");
  }

  logout() {
    this.value = false;
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
