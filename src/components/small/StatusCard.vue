<template>
  <v-card flat class="elevation-2 mb-3">
    <v-card-text class="px-2">
      <v-row class="mx-2">
        <span class="status">
          {{ info.title }}
        </span>
        <v-spacer />
        <span class="status value">
          {{ info.value }}
        </span>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "StatusCard",
  props: {
    info: Object
  }
})
export default class StatusCard extends Vue {}
</script>

<style scoped>
.status {
  font-size: 16px;
}

.value {
  font-weight: bold;
}
</style>
