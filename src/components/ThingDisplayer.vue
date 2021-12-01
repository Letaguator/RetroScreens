<template>
  <div>
    <h3>{{ thing.name }}</h3>
    <p>{{ thing.ipAddress }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Thing from "../classes/thing";

export default defineComponent({
  props: {
    thing: {
      type: Object as PropType<Thing>,
      required: true,
    },
  },
});
</script>

<style scoped>
  div {
    align-content: center;
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    padding: 2px;
    background-color: antiquewhite;
  }
</style>
