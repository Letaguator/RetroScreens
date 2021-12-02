<template>
  <div v-on:click="openApplication">
    <h3>
      {{ application.name }}
      <span v-if="application.saved === false">*</span>
      <p v-if="application.state !== ''">{{application.state}}</p>
    </h3>
    <button v-if="application.flow.length > 0" v-on:click="executeApp">&#9654;</button>
    <button v-on:click="deleteApp">Delete</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import App from "../classes/app";
import Service from "../classes/service";
import Thing from "../classes/thing";
import Relationship from "@/classes/relationship";
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
    async executeApp() {
      const internalAppCall = async () => {
        (this.application as App).state = "Executing";
        for (let i = 0; i < (this.application as App).flow.length; i++) {
          let cmd = (this.application as App).flow[i];

          if((this.application as App).state === "Failed Executing")
            break;

          console.log(cmd)

          this.generalEval(cmd);
        }
      }
      internalAppCall();
    },
    generalEval(cmd) {
      const cmdType = cmd.split(" ")[0];
      console.log(cmdType)
      if(cmdType === "if")
      {
        return this.evalCond(cmd);
      }
      else if(cmdType === "r")
      {
        return this.evalRelationship(cmd);
      }
      else if(cmdType === "s")
      {
        return this.evalService(cmd);
      }
      else 
      {
        (this.application as App).state = "Failed Executing";
      }
    },
    evalService(cmd): Number {
      const segmentedCommand = cmd.split(" ");
      const serviceName = segmentedCommand[1];
      const service: Service = appStore.getters.getServiceByName(serviceName);
      const thing: Thing = appStore.getters.getThingByName(service.thingID);
      let inputs = "";

      if(segmentedCommand.length === 3)
      {
        inputs = segmentedCommand[2];
      }

      const invokeResult = (ipcRenderer as any).send("run-service", {
        serviceName: serviceName,
        inputs: inputs,
        thingId: thing.name,
        ip: thing.ipAddress,
        port: thing.port
      });
      const handledInvokeResult = invokeResult instanceof Number ? invokeResult as Number : 0;

      appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " service named " + service.name + " yielded " + handledInvokeResult })

      return handledInvokeResult;
    },
    evalRelationship(cmd) {
      const segmentedCommand = cmd.split(" ");
      const relationshipName = segmentedCommand[1];
      const relationship: Relationship = appStore.getters.getRelationshipByName(relationshipName);

      if(relationship.type == "control")
      {
        const controlResult = this.evalService("s " + relationship.serv1);
        if(controlResult > 0)
        {
          this.evalService("s " + relationship.serv2 + " " + driverResult);
          appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " control rel yielded yes on running service 2" })
        }
        else
        {
          appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " control rel yielded no on running service 2" })
        }
      }
      else if(relationship.type == "drive")
      {
        var driverResult = this.evalService("s " + relationship.serv1);
        this.evalService("s " + relationship.serv2 + " " + driverResult);
        appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " driver rel yielded a call with " + driverResult })
      }
      else if(relationship.type == "support")
      {
        const resA = this.evalService("s " + relationship.serv1);
        const resB = this.evalService("s " + relationship.serv2);
        appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " support rel yielded: " + resA + " & " + resB })
      }
      else if(relationship.type == "contest")
      {
        const serviceChooser = Math.round(Math.random());
        if(serviceChooser === 1)
        {
          appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " contest rel yielded " + relationship.serv1 })
          this.evalService("s " + relationship.serv1);
        }
        else
        {
          appStore.commit("writeToConsole", { appName: (this.application as App).name, payload: " contest rel yielded " + relationship.serv2 })
          this.evalService("s " + relationship.serv2);
        }
      }
    },
    evalCond(cmd) {
      const cmdParts = cmd.split(" then ");
      const firstEval = cmdParts[0].split(" ", 2);
      const secondEval = cmdParts[1].split(" ", 2);

      if(this.generalEval(firstEval))
      {
        this.generalEval(secondEval)
      }
    },
    deleteApp() {
      (ipcRenderer as any).send("delete-app", (this.application as App).name);
      appStore.commit('removeApp', this.application);
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
