import Vuex from "vuex";
import { createStore } from "vuex";
//import Vue from "vue";
import Service from "../classes/service";
import Thing from "../classes/thing";
import Relationship from "../classes/relationship";
import App from "../classes/app";
import store from ".";

export const appStore = new Vuex.Store({
  state: {
    activeApp: null as App,
    things: [] as Array<Thing>,
    services: [] as Array<Service>,
    relationships: [] as Array<Relationship>,
    apps: [] as Array<App>,
    consoleLines: [] as Array<string>,
  },
  mutations: {
    setActiveApp(state, payload: App) {
      var targetIndex = state.apps.indexOf(payload);
      if(targetIndex !== -1)
      {
        state.activeApp = payload;
      }
    },
    writeToConsole(state, payload: any) {
      state.consoleLines.push("<" + payload.appName + ">" + payload.message);
    },
    addThing(state, payload) {
      state.things.push(payload);
    },
    addService(state, payload) {
      state.services.push(payload);
    },
    addRelationship(state, payload) {
      state.relationships.push(payload);
    },
    addApp(state, payload: App) {
      state.apps.push(payload);
    },
    removeApp(state, payload: App) {
      var targetIndex = state.apps.indexOf(payload);
      if(targetIndex !== -1)
      {
        state.apps.splice(targetIndex, 1);
        if(payload === state.activeApp)
        {
          state.activeApp = null;
        }
      }
    },
  },
  getters: {
    getActiveApp(state) {
      return state.activeApp;
    },
    getConsoleLines: (state) => {
      return state.consoleLines;
    },
    getThings: (state) => {
      return state.things;
    },
    getServices: (state) => {
      return state.services;
    },
    getIpAddressfromThing: (state) => (thingName:string) => {
      for(const entry of state.things){
        if(entry.name == thingName){
          return entry.ipAddress;
        }
      }
    },
    getThingByName: (state) => (thingName: string) => {
      for(const entry of state.things){
        if(entry.name == thingName){
          return entry;
        }
      }

      return null;
    },
    getServicebyThing: (state) => (thingName:string) => {
      let result = [] as Array<Service>;
      if(thingName == ""){
        result = state.services
      }
      else{
        for (const entry of state.services) {
          if (entry.thingID === thingName) {
            result.push(entry);
          }
        }
      }
      
      return result;
    },
    getServiceByName: (state) => (serviceName:string)=>{
      for (const entry of state.services){
        if(entry.name==serviceName){
          return entry;
        }
      }
    },
    getServicebyInput: (state) => {
      const result = [] as Array<Service>;
      for (const entry of state.services){
        if(entry.input == true){
          result.push(entry);
        }
      }
      return result;
    },
    getServicebyOutput: (state) => {
      const result = [] as Array<Service>;
      for (const entry of state.services){
        if(entry.output == true){
          result.push(entry);
        }
      }
      return result;
    },
    getRelationships: (state) => {
      return state.relationships;
    },
    getRelationshipByName: (state) => (relationshipName: string)=>{
      for (const entry of state.relationships){
        if(entry.name == relationshipName){
          return entry;
        }
      }

      return null;
    },
    getApps: (state) => {
      return state.apps;
    },
  },
  actions: {},
  modules: {},
});
