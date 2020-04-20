<template>
  <v-app-bar flat color="secondary">
    <v-toolbar-title class="appTitle">
      <router-link to="/home">
        Money Manager
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <ProfileButton />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProfileButton from "./small/ProfileButton.vue";

@Component({
  name: "Header",
  components: {
    ProfileButton
  }
})
export default class Header extends Vue {}
</script>

<style scoped>
.appTitle a {
  color: #171717;
  text-decoration: none !important;
}
</style>
