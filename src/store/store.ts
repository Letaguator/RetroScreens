import Vuex from "vuex";
import { createStore } from "vuex";
import Vue from "vue";
import Service from "../classes/service";
import Thing from "../classes/thing";
import Relationship from "../classes/relationship";
import App from "../classes/app";

export const appStore = new Vuex.Store({
  state: {
    activeApp: null as App,
    things: [] as Array<Thing>,
    services: [] as Array<Service>,
    relationships: [] as Array<Relationship>,
    apps: [] as Array<App>,
  },
  mutations: {
    setActiveApp(state, payload) {
      state.activeApp = payload;
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
    addApp(state, payload) {
      state.apps.push(payload);
    },
  },
  getters: {
    getActiveApp(state) {
      return state.activeApp;
    },
    getThings: (state) => {
      return state.things;
    },
    getServices: (state) => {
      return state.services;
    },
    getIpAddressfromThing: (state) => (thingName) => {
      for(const entry of state.things){
        if(entry.name == thingName){
          return entry.ipAddress;
        }
      }
    },
    getServicebyThing: (state) => (thingName) => {
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
    getServiceByName: (state) => (serviceName)=>{{
      for (const entry of state.services){
        if(entry.name==serviceName){
          return entry;
        }
      }
    }},
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
    getApps: (state) => {
      return state.apps;
    },
  },
  actions: {},
  modules: {},
});
