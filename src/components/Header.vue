<template>
  <v-app-bar flat color="secondary">
    <v-toolbar-title>Money Manager</v-toolbar-title>

    <v-spacer />

    <v-btn text>
      Log out
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Header"
})
export default class Header extends Vue {}
</script>

<style scoped></style>
