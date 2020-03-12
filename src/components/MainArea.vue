<template>
  <div>
    <Header/>

    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import Header from "./Header.vue";

  @Component({
    components: {
      Header
    }
  })
  export default class MainArea extends Vue {
  }
</script>