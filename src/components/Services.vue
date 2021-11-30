<template>
  <div>
    <p>Services</p> -->
    <ServiceDisplayer v-for="service in services" v-bind:key="service.name" v-bind:service="service"/>
  </div>
</template>

<script lang="ts">
import { appStore } from "../store/store";
import ServiceDisplayer from "./ServiceDisplayer.vue";
import Service from "../classes/service";

export default {
  components: {ServiceDisplayer: ServiceDisplayer},
  data() {
    return {
      services: appStore.getters.getServices as Array<Service>
    };
  },
  methods: {
    expand: function (event) {
      var clickedElement = event.currentTarget;
      var content = clickedElement.lastChild.lastChild;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    },
  },
};
</script>

<style scoped>
</style>
