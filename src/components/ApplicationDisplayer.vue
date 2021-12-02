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
      let conditionalFlag:boolean=false;
      let newFlow: Array<string>
      var relationshipObj:any
      var serviceA:any
      var serviceB:any

      (this.application as App).flow.forEach((item)=>{
        if(item.startsWith('R')){
          var words=item.split(' ')
          relationshipObj = appStore.getters.getRelationshipByName(words[0])
          serviceA = appStore.getters.getServiceByName(relationshipObj.serv1)
          serviceB = appStore.getters.getServiceByName(relationshipObj.serv2)
          if(conditionalFlag){
            newFlow.push('S '+serviceA.name+' *-o-c')
            newFlow.push('S '+serviceB.name+' *-i-c')
            conditionalFlag=false
          }
          else{
            newFlow.push('S '+serviceA.name+' *-o')
            newFlow.push('S '+serviceB.name+' *-i')
          } 
        }
        else if (item.startsWith('S')){
          if(conditionalFlag){
            newFlow.push(item+'*-c')
            conditionalFlag=false
          }
          else{
            newFlow.push(item)
          }
        }
        else if (item.startsWith('if S')){
          newFlow.push(item+' *-c')
          conditionalFlag=true
        }
        else if(item.startsWith('if R')){
          relationshipObj = appStore.getters.getRelationshipByName(words[0])
          serviceA = appStore.getters.getServiceByName(relationshipObj.serv1)
          serviceB = appStore.getters.getServiceByName(relationshipObj.serv2)
          newFlow.push('S '+serviceA.name+' *-o')
          newFlow.push('S '+serviceB.name+' *-i')
          conditionalFlag=true
        }
      });
      (ipcRenderer as any).send("execute-app",newFlow);
      (this.application as App).state = "Executing";
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
