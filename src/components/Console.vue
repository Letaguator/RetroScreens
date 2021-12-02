<template>
    <ConsoleLine v-for="thing in things" v-bind:key="thing.name" v-bind:thing="thing"/>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import ConsoleLine from "./ConsoleLine.vue";

export default defineComponent({
  components: {
    ConsoleLine
  },
  data() {
    return {
      consoleLines: appStore.getters.getConsoleLines,
    };
  }
});
</script>

<style scoped></style>
