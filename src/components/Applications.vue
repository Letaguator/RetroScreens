<template>
  <div>
    <ApplicationDisplayer v-for="application in applications" v-bind:key="application.name" v-bind:application="application"/>
  </div>
  <div>
    <input type="text" v-model="newAppName" />
    <button v-on:click="createApplication">Create Application</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import App from "../classes/app";
import ApplicationDisplayer from "./ApplicationDisplayer.vue";

export default defineComponent({
  components: {
    ApplicationDisplayer
  },
  methods: {
    createApplication() {
      if(this.newAppName.length > 1 && this.newAppName.length <= 16)
      {
        let app = new App(this.newAppName, [] as Array<string>);
        this.applications.push(app);
        this.newAppName = "";
      }
      else{
        alert("App name must be between 2 and 16 chars");
      }
    }
  },
  data() {
    return {
      newAppName: "",
      applications: [
        new App("TriggerAlarms", [
          "S serviceA",
          "S serviceB",
          "R relationshipC",
        ]),
        new App("BeepTweet", [
          "S serviceX",
          "S serviceY",
          "S ServiceC",
          "R relationshipC",
        ]),
      ],
    };
  }
});

</script>

<style scoped>

</style>
