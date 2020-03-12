<template>
  <v-btn depressed dark color="accent" @click="showDialog">Add record</v-btn>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    name: "AddItem"
  })
  export default class AddItem extends Vue {
    showDialog() {
      console.log("Show unput dialog.");
    }
  }
</script>
