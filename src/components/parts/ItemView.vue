<template>

</template>

<script lang="ts">
  interface Item {
    category: string; // type Category ?
    title: string;
    amount: number;
  }

  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component({
    name: "ItemView"
  })
  export default class ItemView extends Vue {
    @Prop({
      default: {
        category: "Food",
        title: "Dinner shop",
        amount: -430
      }
    })
    details: Item;
  }
</script>
