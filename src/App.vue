<template>
  <IoTLoader v-if="hasLoadedIoT === false"/>
  <div id="mainView" v-else>
    <LeftTab />
    <Editor />
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import IoTLoader from "./components/IoTLoader.vue";
import LogWindow from "./components/LogWindow.vue";
import LeftTab from "./components/LeftTab.vue";
import Editor from "./components/Editor.vue";
import Panel from "./components/Panel.vue";

import { appStore } from "./store/store";
import Thing from "./classes/thing"
import Service from "./classes/service";
import Relationship from "./classes/relationship";
import App from "./classes/app";

const { ipcRenderer } = window.require("electron");

export default defineComponent({
  components: {
    IoTLoader,
    LeftTab,
    Editor
    // LogWindow,
  },
  mounted() {
    (ipcRenderer as any).on(
      "handle-iot-data",
      (evt, iotData) => {
        let obj = iotData;
        
        if(obj["Tweet Type"] == "Identity_Language"){
            let newThing = new Thing(obj["Thing ID"],obj["IP"],obj["Port"]);
            appStore.commit('addThing', newThing);
        }
        else if(obj["Tweet Type"] == "Service"){
            let inp = false;
            let out = false;
            let brackIndex = obj["API"].indexOf("[");
            if(obj["API"][brackIndex + 1] == 'N' && obj["API"][brackIndex + 2] == 'U'){
                inp = false;
            }
            else{
                inp = true;
            }
            let parIndex = obj["API"].indexOf("(");
            if(obj["API"][parIndex + 1] =='N' && obj["API"][parIndex + 2] == 'U'){
                out = false;
            }
            else{
                out = true;
            }
            console.log(out);
            let newService = new Service(obj["Name"],obj["Thing ID"],out,inp);
            appStore.commit('addService', newService);
        }
        else if(obj["Tweet Type"] == "Relationship"){
            let nRelationship = new Relationship(obj["Name"],obj["Type"],obj["FS name"],obj["SS name"]);
            appStore.commit('addRelationship', nRelationship);
        }
      }
    );
    
    let appDatas = (ipcRenderer as any).sendSync("load-apps");
    for(const appData of appDatas)
    {
      appStore.commit('addApp', new App(appData.name, appData.src, true));
    }

    (ipcRenderer as any).send("get-iot-data");
    setTimeout(() => {
      this.hasLoadedIoT = true;
      setTimeout(() =>
      {
        document.getElementById("defaultOpen").click();
      }, 100);
    }, 3/*5*/ * 1000);
  },
  
  data() {
    return {
      hasLoadedIoT: false,
    };
  },
});
</script>

<style scoped>
  #mainView {
    display: flex;
    flex-direction: row;
    min-height: 100vh;
  }
</style>
