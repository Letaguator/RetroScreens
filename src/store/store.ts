import { createStore } from "vuex";
import Vuex from "vuex";
import Vue from "vue";
import { Thing } from "./classes";
import { Service } from "./classes";
import { Relationship } from "./classes";
import { App } from "./classes";

export const appStore = new Vuex.Store({
  state: {
    things: [],
    services: [],
    relationships: [],
    apps: [],
  },
  mutations: {
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
    getThings: (state) => {
      return state.things;
    },
    getServices: (state) => {
      return state.services;
    },
    getServicebyThing: (state) => (thingName) =>{
      let result = [] as Array<Service>;
      for(let entry of state.services){
        if (entry.thingID === thingName){
          result.push(entry)
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
