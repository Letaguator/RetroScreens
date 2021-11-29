import Vuex from "vuex";
import { createStore } from "vuex";
import Vue from "vue";
import Service from "../classes/service";
import Thing from "../classes/thing";
import Relationship from "../classes/relationship";
import App from "../classes/App";

export const appStore = new Vuex.Store({
  state: {
    things: [] as Array<Thing>,
    services: [] as Array<Service>,
    relationships: [] as Array<Relationship>,
    apps: [] as Array<App>,
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
    getServicebyThing: (state) => (thingName) => {
      const result = [] as Array<Service>;
      for (const entry of state.services) {
        if (entry.thingID === thingName) {
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
