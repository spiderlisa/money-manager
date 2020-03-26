<template>
  <v-card>
    <v-card-title>
      New category
    </v-card-title>
    <v-card-text class="mt-3">
      <v-form v-model="form">
        <v-text-field
                dense
                outlined
                label="Name"
                type="text"
                required
                :rules="rules.name"
                v-model="category.name"
        />
        <v-select
                dense
                outlined
                required
                :rules="rules.frequency"
                label="Frequency"
                :items="frequencyOptions"
                v-model="category.frequency"
        />
        <v-text-field
                dense
                outlined
                label="Budget"
                type="number"
                min="0.01"
                suffix="$"
                required
                :rules="rules.budget"
                v-model="category.budget"
        />
      </v-form>

      <v-row class="px-3">
        <v-spacer/>
        <v-btn depressed color="gray" class="mr-2" @click="exit">
          Cancel
        </v-btn>
        <v-btn depressed color="accent" @click="saveCategory">
          Save
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from "vue-property-decorator";
  import { Frequency } from '../../store/models';

  @Component({
    name: 'AddCategory'
  })
  export default class AddCategory extends Vue {
    category = {
      name: null,
      budget: null,
      frequency: null
    };

    form = true;
    rules = {
      name: [
        (v: any) => !!v || 'Name is required'
      ],
      budget: [
        (v: any) => !!v || 'Budget is required'
      ],
      frequency: [
        (v: any) => !!v || 'Frequency is required'
      ]
    };

    get frequencyOptions() {
      const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
      return Object.keys(Frequency).filter(StringIsNumber).map((key: any) => Frequency[key]);
    }

    @Emit('added-category')
    async saveCategory() {
      await this.$store.dispatch("addCategory", this.category);

      this.category = {
        name: null,
        budget: null,
        frequency: null
      };
    }

    @Emit('added-category')
    exit() {
      // console.log('bye');
    }
  }
</script>
