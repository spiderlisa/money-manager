<template>
  <v-card tile flat>
    <v-divider />
    <v-card-text>
      <v-row class="px-3">
        <v-chip small class="mr-3">
          {{ record.category && record.category.name || "Salary" }}
        </v-chip>
        {{ record.desc }}
        <v-spacer/>
        ${{ record.sum }}
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";

  @Component({
    name: 'DayView',
    props: {
      record: {}
    }
  })
  export default class DayView extends Vue {
  }

</script>