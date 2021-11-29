<template>
  <draggable>
    <div>
      <p>Test</p>
    </div>
  </draggable>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import draggable from "vuedraggable";

export default defineComponent({
  components: {
    draggable,
  },
});
</script>

<style scoped>
div {
  border: 1px solid;
}
</style>
