<template>
  <div class="card" v-on:click="expand($event)">
      <div class="container">
        <h3>{{ service.name }}</h3>
        <p>{{ service.thingID }}</p>
        <div class="content">
          <p>
            Additional Service Info goes here
          </p>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Service from "../classes/service";

export default defineComponent({
  props: {
    service: {
      type: Object as PropType<Service>,
      required: true,
    },
  },
  methods: {
    expand: function (event) {
      var clickedElement = event.currentTarget;
      //console.log(clickedElement.lastChild);
      var content = clickedElement.lastChild.lastChild;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    },
  },
});
</script>

<style scoped>
  /* div {
    align-content: center;
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    padding: 2px;
    background-color: antiquewhite;
  } */
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 100%;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
