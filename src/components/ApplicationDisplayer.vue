<template>
  <div>
    <h3>{{ application.name }}</h3>
    <button>&#9654;</button>
    <button>&#9646; &#9646;</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import App from "../classes/app";

export default defineComponent({
  props: {
    application: {
      type: Object as PropType<App>,
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
