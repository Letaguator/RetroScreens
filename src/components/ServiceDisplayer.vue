<template>
  <div>
    <h3>{{ service.name }}</h3>
    <p>{{ service.thingID }}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Service from "./Service";

export default defineComponent({
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
});
</script>

<style scoped>
  div {
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    padding: 2px;
    background-color: antiquewhite;
  }
</style>
