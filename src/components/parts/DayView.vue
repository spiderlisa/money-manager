<template>
  <v-card flat class="mb-3 elevation-2">
    <v-card-text>
      {{ prettyDate }}
    </v-card-text>
    <template v-for="(record, k) in day.records">
      <ItemView :key="k" :record="record" />
    </template>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemView from "./ItemView.vue";
import { formatToWritten } from "../../utils/date";

@Component({
  name: "DayView",
  components: {
    ItemView
  },
  props: {
    day: Object as () => DayView
  }
})
export default class DayView extends Vue {
  get prettyDate() {
    return formatToWritten(this.$props.day.date);
  }
}
</script>
