<template>
  <p>Services</p>
  <ServiceDisplayer v-for="service in services" v-bind:key="service.name" v-bind:service="service"/>
</template>

<script lang="ts">
import Service from "./Service";
import ServiceDisplayer from "./ServiceDisplayer.vue";
export default {
  components: {ServiceDisplayer: ServiceDisplayer},
  setup()
  {
      const services: Service[] = [ new Service("Test", "id", false, true), new Service("Test2", "id2", true, false)];
      return { services };
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>
  div {
    display: block;
  }
</style>
