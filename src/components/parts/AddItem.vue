<template>
  <v-dialog width="400">
    <template v-slot:activator="{ on }">
      <v-btn depressed dark color="accent" v-on="on">
        Add record
      </v-btn>
    </template>

    <v-card>
      <v-bottom-navigation flat color="accent" :value="type">
        <v-btn @click="type = 0">
          Expense
        </v-btn>
        <v-btn @click="type = 1">
          Income
        </v-btn>
      </v-bottom-navigation>
      <v-card-text class="pa-5">
        <v-form>
          <v-text-field
                  label="Amount"
                  v-model="record.amount"
          />
          <v-select
                  :items="categories"
                  label="Category"
                  v-model="record.category"
          />
          <v-text-field
                  label="Comment"
                  v-model="record.comment"
          />
          <v-menu
                  ref="dateMenu"
                  v-model="dateMenu"
                  :close-on-content-click="false"
                  :return-value.sync="record.date"
                  transition="scale-transition"
                  offset-y
                  dense
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                      v-model="record.date"
                      label="Date"
                      dense
                      readonly
                      hide-details
                      clearable
                      v-on="on"
                      @change="$refs.dateMenu.save(record.date)"
              />
            </template>
            <v-date-picker
                    v-model="record.date"
                    class="dateCalendar"
                    no-title
                    elevation="2"
                    @input="$refs.dateMenu.save(record.date)"
            >
            </v-date-picker>
          </v-menu>
        </v-form>

        <v-row>
          <v-spacer />

          <v-btn small depressed color="accent" @click="saveRecord">
            Save
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { Category } from "../../store/models";

  @Component({
    name: "AddItem"
  })
  export default class AddItem extends Vue {
    record = {
      amount: 150,
      category: 52,
      comment: 'Test',
      date: '2020-03-02T20:00:00'
    };

    dateMenu = false;
    type = 0;

    get categories() {
      const data = this.$store.getters["categories"];

      if (!data || data === 'undefined')
        return [];

      return data.map((cat: Category) => {
        return {
          value: cat.id,
          text: cat.name
        };
      });
    }

    async saveRecord() {
      const payload = {
        expense: {
          sum: this.record.amount,
          recordDate: this.record.date,
          desc: this.record.comment
        },
        categoryId: this.record.category
      };
      await this.$store.dispatch('addExpense', payload);
    }
  }
</script>

<style scoped>
  .dateCalendar >>> .v-picker__body {
    margin: 10px 0 5px;
  }
</style>
