<template>
  <div>
    <Header />

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Header from "./Header.vue";

    @Component({
      components: {
        Header
      }
    })
    export default class MainArea extends Vue {}
</script>