<template>
  <div id="newApplicationBar">
    <input type="text" placeholder="Application Name" v-model="newAppName" />
    <button v-on:click="createApplication">Create Application</button>
  </div>
  <div>
    <p>Import a .viot file from disk</p>
    <div id="uploadInteractorsDiv">
      <input type="file" accept=".viot" @change="onFileSelect" />
      <button v-on:click="loadApp">Upload App</button>
    </div>
  </div>
  <div id="appList">
    <ApplicationDisplayer v-for="application in applications" v-bind:key="application.name" v-bind:application="application"/>
  </div>
</template>

<script lang="ts">
import { appStore } from "@/store/store";
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
        let duplicateName = false;
        for(let application of this.applications)
        {
          if(application.name === this.newAppName)
          {
            duplicateName = true;
          }
        }
        
        if(duplicateName)
        {
          alert("App with the name '" + this.newAppName + "' already exists");
        }
        else
        {
          let app = new App(this.newAppName, "", false);
          appStore.commit("addApp", app);
          this.newAppName = "";
        }
      }
      else{
        alert("App name must be between 2 and 16 chars");
      }
    },
    onFileSelect(evt) {
      const files = evt.target.files;
      const targetFile = files[0];
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        const src = fileReader.result as string;
        this.uploadApp = new App(targetFile.name.split(".")[0], src, false);
      });
      fileReader.readAsText(targetFile);
    },
    loadApp()
    {
      if(this.uploadApp != null)
      {
        let duplicateName = false;
        for(let application of this.applications)
        {
          if(application.name === this.uploadApp.name)
          {
            duplicateName = true;
          }
        }
        
        if(duplicateName)
        {
          alert("App with the name '" + this.uploadApp.name + "' already exists");
        }
        else
        {
          appStore.commit("addApp", this.uploadApp);
        }
      }
    }
  },
  computed: {
    applications(): Array<App> {
      return appStore.getters.getApps as Array<App>
    }
  },
  data() {
    return {
      newAppName: "",
      uploadApp: null as App
    };
  }
});

</script>

<style scoped>
  #newApplicationBar
  {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #495878;
    height: 48px;
  }

  input, button
  {
    height: 32px;
  }

  p, input {
    color: white;
    background-color: #323C52;
  }

  #uploadInteractorsDiv {
    display: flex;
    flex-direction: row;
  }
</style>
