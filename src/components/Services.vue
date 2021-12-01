<template>
  <div>
  <select @change="onChange($event)" v-model="selected">
    <option value="">Select a Thing</option>
    <option v-for="thing in things" :key="thing.name"> {{ thing.name }} </option>
  </select>
  </div>
  <div>
    <ServiceDisplayer v-for="service in servicebything" v-bind:key="service.name" v-bind:service="service"/>
  </div>
</template>

<script lang="ts">
import { appStore } from "../store/store";
import ServiceDisplayer from "./ServiceDisplayer.vue";
import Service from "../classes/service";
import Thing from "../classes/thing"
import Vue, { PropType, defineComponent } from "vue";

export default defineComponent({
  components: {ServiceDisplayer: ServiceDisplayer},
  data() {
    return {
      services: appStore.getters.getServices as Array<Service>,
      servicebything: appStore.getters.getServicebyThing("") as Array<Service>,
      things: appStore.getters.getThings as Array<Thing>,
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
    onChange: function (event) {
      var newArray = [] as Array<Service>;
      newArray = appStore.getters.getServicebyThing(event.target.value);
      this.servicebything = newArray;
    },
  },
});
</script>

<style scoped>
</style>
