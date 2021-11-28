import { createStore } from "vuex";
import Vuex from "vuex";
import Vue from "vue";
import Thing from "../classes/thing";
import Service from "../classes/service";
import Relationship from "../classes/relationship";
import App from "../classes/app";

export const appStore = new Vuex.Store({
  state: {
    things: [] as Array<Thing>,
    services: [] as Array<Service>,
    relationships: [] as Array<Relationship>,
    apps: [] as Array<App>,
  },
  mutations: {
    addThing(state, payload: Thing) {
      state.things.push(payload);
    },
    addService(state, payload: Service) {
      state.services.push(payload);
    },
    addRelationship(state, payload: Relationship) {
      state.relationships.push(payload);
    },
    addApp(state, payload: App) {
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
