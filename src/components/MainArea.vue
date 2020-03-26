<template>
  <div>
    <Header />

    <v-content>
      <router-view />
    </v-content>

    <v-overlay absolute :value="loading" color="white" z-index="1000" />
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
  get loading() {
    return this.$store.getters["loading"];
  }
}
</script>
