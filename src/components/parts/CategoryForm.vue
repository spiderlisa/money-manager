<template>
  <v-form v-model="form" ref="form">
    <v-text-field
      dense
      outlined
      label="Name"
      type="text"
      required
      :rules="rules.name"
      v-model="category.name"
      @input="emitData"
    />
    <v-select
      dense
      outlined
      required
      :rules="rules.frequency"
      label="Frequency"
      :items="frequencyOptions"
      v-model="category.frequency"
      @input="emitData"
    />
    <v-text-field
      dense
      outlined
      label="Budget"
      type="number"
      min="1"
      suffix="$"
      required
      :rules="rules.budget"
      v-model="category.budget"
      @input="emitData"
    />
  </v-form>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Frequency } from "../../store/models";

@Component({
  name: "CategoryForm",
  props: {
    cat: Object as () => any
  }
})
export default class CategoryForm extends Vue {
  @Prop() public cat: any;

  category = {
    name: this.cat.name || null,
    budget: this.cat.budget || null,
    frequency: this.cat.frequency || null
  };

  form = true;
  rules = {
    name: [(v: any) => !!v || "Name is required"],
    budget: [
      (v: any) => !!v || "Budget is required",
      (v: any) => v > 0 || "Budget cannot be negative"
    ],
    frequency: [(v: any) => !!v || "Frequency is required"]
  };

  get frequencyOptions() {
    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
    return Object.keys(Frequency)
      .filter(StringIsNumber)
      .map((key: any) => Frequency[key]);
  }

  @Emit("values-changed")
  emitData() {
    return {
      category: this.category,
      valid: this.form
    };
  }
}
</script>
