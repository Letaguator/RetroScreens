<template>
  <div>
    <h3>{{ message }}</h3>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
export default defineComponent({
  props: {
    message: {
      type: String,
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