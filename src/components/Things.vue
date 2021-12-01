<template>
  <div>
    <ThingDisplayer v-for="thing in things" v-bind:key="thing.name" v-bind:thing="thing"/>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import Thing from "../classes/thing";
import ThingDisplayer from "./ThingDisplayer.vue";

export default defineComponent({
  components: {
    ThingDisplayer
  },
  data() {
    return {
      things: appStore.getters.getThings,
    };
  }
});
</script>

<style scoped>
</style>
