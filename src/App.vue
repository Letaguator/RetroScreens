<template>
  <IoTLoader v-if="hasLoadedIoT === false"/>
  <div v-else>
    <div class="tab">
      <button
        class="tablinks"
        v-on:click="reveal($event, 'Things')"
        id="defaultOpen"
      >
        Things
      </button>
      <button class="tablinks" v-on:click="reveal($event, 'Services')">
        Services
      </button>
      <button class="tablinks" v-on:click="reveal($event, 'Relationships')">
        Relationships
      </button>
      <button class="tablinks" v-on:click="reveal($event, 'Applications')">
        Applications
      </button>
      <button class="tablinks" v-on:click="reveal($event, 'Console')">
        Console
      </button>
    </div>

    <div id="Things" class="tabcontent">
      <Things />
    </div>

    <div id="Services" class="tabcontent">
      <Services />
    </div>

    <div id="Relationships" class="tabcontent">
      <Relationships />
    </div>

    <div id="Applications" class="tabcontent">
      <Applications />
    </div>

    <div id="Console" class="tabcontent">
      <Console />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Things from "./components/Things.vue";
import Services from "./components/Services.vue";
import Relationships from "./components/Relationships.vue";
import Applications from "./components/Applications.vue";
import IoTLoader from "./components/IoTLoader.vue";
import LogWindow from "./components/LogWindow.vue";
import Panel from "./components/Panel.vue";

const { ipcRenderer } = window.require("electron");
import { appStore } from "./store/store";
import Thing from "./classes/thing"
import Service from "./classes/service";
import Relationship from "./classes/relationship";

export default defineComponent({
  components: {
    Things,
    Services,
    Relationships,
    Applications,
    IoTLoader,
    // LogWindow,
    // Panel,
  },
  mounted() {
    ((window as any).ipcRenderer as any).on(
      "handle-iot-data",
      (evt, iotData) => {
        let obj = iotData;
        console.log(iotData);
        
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
            if(parIndex + 1 =='N' && parIndex + 2 == 'U'){
                out = false;
            }
            else{
                out = true;
            }
            let newService = new Service(obj["Name"],obj["Thing ID"],out,inp);
            appStore.commit('addService', newService);
        }
        else if(obj["Tweet Type"] == "Relationship"){
            let nRelationship = new Relationship(obj["Name"],obj["Type"],obj["FS name"],obj["SS name"]);
            appStore.commit('addRelationship', nRelationship);
        }
      }
    );
    
    ((window as any).ipcRenderer as any).send("get-iot-data");
    setTimeout(() => {
      this.hasLoadedIoT = true;
      setTimeout(() =>
      {
        document.getElementById("defaultOpen").click();
      }, 100);
    }, 3/*5*/ * 1000);
  },
  methods: {
    reveal: function (evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      evt.currentTarget.className += " active";
    },
  },
  data() {
    return {
      hasLoadedIoT: false,
      panels: [
        { id: 0, title: "X" },
        { id: 1, title: "Y" },
      ],
      dragging: false,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

/* Style the tab */
.tab {
  float: left;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 20%;
  height: auto;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  display: block;
  background-color: inherit;
  color: black;
  padding: 22px 16px;
  width: 100%;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 80%;
  border-left: none;
  height: auto;
}
</style>
