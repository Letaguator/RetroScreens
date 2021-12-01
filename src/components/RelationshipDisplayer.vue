<template>
  <div id="relationshipDisplayerDiv">
    <h3>{{ relationship.name }}</h3>
    <p>Relationship type: {{ relationship.type}}</p>
    <div>
        <p>Service 1: {{ relationship.serv1}}</p>
        <p>Service 2: {{ relationship.serv2}}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Relationship from "../classes/relationship";

export default defineComponent({
  props: {
    relationship: {
      type: Object as PropType<Relationship>,
      required: true,
    },
  },
});
</script>

<style scoped>
  #relationshipDisplayerDiv {
    align-content: center;
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    padding: 2px;
    background-color: antiquewhite;
  }
</style>