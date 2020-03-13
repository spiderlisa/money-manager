<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <AddItem/>
      </v-col>

      <v-col cols="10">

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import AddItem from "../parts/AddItem.vue";

  @Component({
    components: {
      AddItem
    }
  })
  export default class Journal extends Vue {
    beforeMount() {
      this.$store.dispatch('fetchJournal');
      this.$store.dispatch('fetchCategories');
    }
  }
</script>
