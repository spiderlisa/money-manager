<template>
  <v-card tile flat>
    <v-divider />
    <v-card-text color="primary">
      <v-row class="px-3">
        <v-chip small class="mr-3" :color="category.color">
          {{ category.name }}
        </v-chip>

        <span>
          {{ record.desc }}
        </span>

        <v-spacer/>

        <span class="font-weight-bold">
          {{ record.sum }}
        </span>
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
    get category() {
      const recCat = this.$props.record.category;

      if (recCat)
        return {
          color: 'info',
          name: recCat.name
        };
      else
        return {
          color: 'success',
          name: 'Income'
        }
    }
  }

</script>