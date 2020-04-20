<template>
  <v-row>
    <v-col cols="9" class="pt-0">
      <div class="subtitle-2">{{ category.name }}</div>
      <div>
        {{ toTitleCase(category.freq) }} budget - ${{ category.budget }}.00
      </div>
      <div>Current expenses - ${{ category.currentExpenses }}</div>
    </v-col>
    <v-col cols="3" class="pt-0 d-flex justify-end">
      <v-btn x-small text color="accent" @click="categoryUpdateVisible = true">
        Edit
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Category } from "../../store/models";

@Component({
  name: "CategoryInfo",
  props: {
    category: Object as () => Category
  }
})
export default class CategoryInfo extends Vue {
  categoryUpdateVisible = false;

  toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}
</script>
