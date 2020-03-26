<template>
  <v-card v-if="type < 2">
    <v-bottom-navigation flat horizontal color="accent" :value="type" class="elevation-1" height="50">
      <v-btn @click="type = 0">
        <span>Expense</span>
        <v-icon>mdi-shopping</v-icon>
      </v-btn>
      <v-btn @click="type = 1">
        <span>Income</span>
        <v-icon>mdi-import</v-icon>
      </v-btn>
    </v-bottom-navigation>

    <v-card-text class="pa-5">
      <v-form class="mt-2" v-model="form">
        <v-text-field
                dense
                outlined
                label="Amount"
                type="number"
                min="1"
                suffix="$"
                required
                :rules="rules.amount"
                v-model="record.amount"
        />
        <v-select
                v-if="type === 0"
                dense
                outlined
                required
                :rules="rules.category"
                label="Category"
                :items="categories"
                v-model="record.category"
                append-icon="mdi-plus"
                @click:append="type = 2"
        />
        <v-menu
                v-if="type === 0"
                ref="dateMenu"
                v-model="dateMenu"
                :close-on-content-click="false"
                :return-value.sync="record.date"
                transition="scale-transition"
                offset-y
                dense
                max-width="330"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="record.date"
                    dense
                    readonly
                    outlined
                    required
                    hide-details
                    class="mb-6"
                    label="Date"
                    v-on="on"
                    @change="$refs.dateMenu.save(record.date)"
            />
          </template>
          <v-date-picker
                  v-model="record.date"
                  class="dateCalendar"
                  no-title
                  full-width
                  @input="$refs.dateMenu.save(record.date)"
          >
          </v-date-picker>
        </v-menu>
        <v-text-field
                v-if="type === 0"
                dense
                outlined
                label="Comment"
                v-model="record.comment"
        />
      </v-form>

      <v-row class="px-3">
        <v-spacer/>
        <v-btn depressed color="accent" @click="saveRecord">
          Save
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
  <AddCategory v-else @added-category="backToRecord"/>
</template>

<script lang="ts">
  import { Component, Emit, Vue } from "vue-property-decorator";
  import dateformat from "dateformat";
  import AddCategory from "./AddCategory.vue";
  import { Category } from "../../store/models";
  import { toSeconds } from "../../utils/date";

  @Component({
    name: "AddItem",
    components: {
      AddCategory
    }
  })
  export default class AddItem extends Vue {
    record = {
      amount: null,
      category: null,
      comment: null,
      date: dateformat(new Date(), "isoDate")
    };

    dateMenu = false;
    type = 0;

    form = true;
    rules = {
      amount: [
        (v: any) => !!v || 'Amount is required'
      ],
      category: [
        (v: any) => !!v || 'Category is required'
      ]
    };

    get categories() {
      const data = this.$store.getters["categories"];

      if (!data || data === "undefined")
        return [];

      return data.map((cat: Category) => {
        return {
          value: cat.id,
          text: cat.name
        };
      });
    }

    @Emit('close-dialog')
    async saveRecord() {
      // add expense
      if (this.type === 0) {
        const payload = {
          expense: {
            sum: this.record.amount,
            recordDate: toSeconds(this.record.date),
            desc: this.record.comment
          },
          categoryId: this.record.category
        };
        await this.$store.dispatch("addExpense", payload);
      }
      // add income
      else if (this.type === 1) {
        await this.$store.dispatch("addIncome", this.record.amount);
      }

      this.record = {
        amount: null,
        category: null,
        comment: null,
        date: dateformat(new Date(), "isoDate")
      }
    }

    backToRecord() {
      this.type = 0;
    }
  }
</script>

<style scoped>
  .dateCalendar >>> .v-picker__body {
    margin: 10px 0 5px;
  }
</style>
