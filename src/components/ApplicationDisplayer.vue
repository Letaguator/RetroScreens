<template>
  <div v-on:click="openApplication">
    <h3>
      {{ application.name }}
      <span v-if="application.saved === false">*</span>
      <p v-if="application.state !== ''">{{application.state}}</p>
    </h3>
    <button v-on:click="executeApp">&#9654;</button>
    <button v-on:click="deleteApp">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import App from "../classes/app";
const { ipcRenderer } = window.require("electron");

export default defineComponent({
  props: {
    application: {
      type: Object as PropType<App>,
      required: true,
    },
  },
  methods: {
    openApplication() {
      appStore.commit('setActiveApp', this.application);
    },
    executeApp() {
      (ipcRenderer as any).send("execute-app", (this.application as App).flow);
      (this.application as App).state = "Executing";
    },
    deleteApp() {
      console.log((this.application as App).name);
      (ipcRenderer as any).send("delete-app", (this.application as App).name);
    }
  }
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
  
  div:hover {
    background-color: whitesmoke;
  }

  div:active {
    background-color: grey;
  }
</style>
