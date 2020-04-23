<template>
  <v-row class="justify-center">
    <v-col cols="9" class="pt-0">
      <div class="subtitle-2">{{ category.name }}</div>
      <div>
        {{ toTitleCase(category.freq) }} budget - ${{ category.budget }}.00
      </div>
      <div>Current expenses - ${{ category.currentExpenses }}</div>
    </v-col>
    <v-col cols="3" class="pt-0 d-flex justify-end">
      <v-btn
        x-small
        text
        color="accent"
        @click="categoryUpdateVisible = true"
        v-if="!categoryUpdateVisible"
      >
        Edit
      </v-btn>
      <v-btn
        x-small
        text
        color="accent"
        @click="categoryUpdateVisible = false"
        v-if="categoryUpdateVisible"
      >
        Cancel
      </v-btn>
    </v-col>
    <v-col cols="7" v-if="categoryUpdateVisible">
      <CategoryForm
        :cat="categoryDetails"
        @values-changed="updateData($event)"
      />
      <div class="d-flex justify-end">
        <v-btn color="error" small depressed @click="deleteCategory">
          Delete
        </v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          small
          depressed
          :disabled="!formValid"
          @click="saveCategory"
        >
          Save
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12" v-if="action === actionType.updateSuccess" class="text-center">
      <v-alert color="accent" border="top" text class="body-2"
        >Category updated</v-alert
      >
    </v-col>
    <v-col cols="12" v-if="action === actionType.updateFail" class="text-center">
      <v-alert color="error" border="top" text class="body-2"
        >Failed to update category</v-alert
      >
    </v-col>
    <v-col cols="12" v-if="action === actionType.deleteFail" class="text-center">
      <v-alert color="error" border="top" text class="body-2"
        >Failed to delete category</v-alert
      >
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Category } from "../../store/models";
import CategoryForm from "./CategoryForm.vue";

enum Action {
  updateSuccess,
  updateFail,
  deleteSuccess,
  deleteFail,
  none
}

@Component({
  name: "CategoryInfo",
  props: {
    category: Object as () => Category
  },
  components: {
    CategoryForm
  }
})
export default class CategoryInfo extends Vue {
  @Prop() public category: Category;

  categoryUpdateVisible = false;

  formValid = false;
  categoryDetails = {
    name: this.category.name,
    frequency: this.category.freq,
    budget: this.category.budget
  };

  action = Action.none;
  actionType = Action;

  toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  updateData(data: { category: any; valid: boolean }) {
    this.categoryDetails = data.category;
    this.formValid = data.valid;
  }

  async saveCategory() {
    const res = await this.$store.dispatch("updateCategory", {
      id: this.category.id,
      category: this.categoryDetails
    });

    if (res) {
      this.categoryUpdateVisible = false;
      this.action = Action.updateSuccess;
      setTimeout(() => (this.action = Action.none), 4000);
    } else {
      this.action = Action.updateFail;
      setTimeout(() => (this.action = Action.none), 4000);
    }
  }

  async deleteCategory() {
    const res = await this.$store.dispatch("deleteCategory", this.category.id);

    if (res) {
      this.categoryUpdateVisible = false;
      this.action = Action.deleteSuccess;
      setTimeout(() => (this.action = Action.none), 4000);
    } else {
      this.action = Action.deleteFail;
      setTimeout(() => (this.action = Action.none), 4000);
    }
  }
}
</script>
