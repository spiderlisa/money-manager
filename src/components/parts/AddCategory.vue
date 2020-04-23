<template>
  <v-card>
    <v-card-title>
      New category
    </v-card-title>
    <v-card-text class="mt-3">
      <CategoryForm :cat="category" @values-changed="receiveUpdates($event)" />

      <v-row class="px-3">
        <v-spacer />
        <v-btn depressed color="gray" class="mr-2" @click="exit">
          Cancel
        </v-btn>
        <v-btn
          depressed
          color="accent"
          :disabled="!valid"
          @click="saveCategory"
        >
          Save
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Emit, Vue } from "vue-property-decorator";
import CategoryForm from "./CategoryForm.vue";

@Component({
  name: "AddCategory",
  components: {
    CategoryForm
  }
})
export default class AddCategory extends Vue {
  category = {
    name: null,
    budget: null,
    frequency: null
  };
  valid = false;

  receiveUpdates(data: { category: any; valid: boolean }) {
    this.category = data.category;
    this.valid = data.valid;
  }

  @Emit("added-category")
  async saveCategory() {
    await this.$store.dispatch("addCategory", this.category);
  }

  @Emit("added-category")
  exit() {
    // console.log('bye');
  }
}
</script>
