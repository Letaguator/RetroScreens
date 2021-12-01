<template>
  <div>
    <ul id="listOfThings">
      <li v-for="thing in things" :key="thing.ipaddress">
        {{ thing.message }}
        <div class="card" v-on:click="expand($event)">
          <!-- <img src="" alt=""> -->
          <div class="container">
            <h4>{{ thing.name }}</h4>
            <h4>{{ thing.ipAddress }}</h4>
            <div class="content">
              <p>
                Additional Thing Info goes here
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { appStore } from "../store/store";
import Thing from "../classes/thing";

export default {
  data() {
    return {
      things: appStore.getters.getThings,
    };
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
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

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
