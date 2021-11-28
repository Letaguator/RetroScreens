<template>
  <div>
    <p>Test</p>
    <p>{{service.name}}</p>
    <p>{{service.thingID}}</p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType , defineComponent} from "vue";
import Service from "./Service";

export default defineComponent({
  props: {
      service: {
          type: Object as PropType<Service>,
          required: true
      }
  }
});
</script>

<style scoped></style>
