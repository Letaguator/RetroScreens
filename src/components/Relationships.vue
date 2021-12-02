<template>
  <div>
    <RelationshipDisplayer v-for="relationship in relationships" v-bind:key="relationship.name" v-bind:relationship="relationship"/>
  </div>

  <button class="open-button" v-on:click="openForm">Add New</button>

  <div class="form-popup" id="myForm">
    <div class="form-container">
      <h4>Create a Relationship</h4>

      <label for="RelationshipName">Relationship Name</label>
      <input
        type="text"
        placeholder="esg"
        name="RelationshipName"
        required
        v-model="newRelationshipName"
      />

      <label for="RelationshipType">Service Type</label>
      <select name="RelationshipType" id="RelationshipType" v-model="newRelationshipType">
        <option value="Control">Control</option>
        <option value="Drive">Drive</option>
        <option value="Support">Support</option>
        <option value="Contest">Contest</option>
      </select>
      <br /><br />
      <label for="ServiceType1">Select Service 1</label>
      <select name="ServiceType1" id="Service1" v-model="service1Name">
        <option disabled value="">Select Here</option>
        <option v-for="output in outputs" :key="output.name">
        {{ output.name }} </option>
      </select>
      <br /><br />
      <label for="ServiceType2">Select Service 2</label>
      <select name="ServiceType2" id="Service2" v-model="service2Name">
        <option disabled value="">Select Here</option>
        <option v-for="input in inputs" :key="input.name">
        {{ input.name}} </option>
      </select>
      <br /><br />
      <input type="submit" class="btn" v-on:click="saveRelationship" value="Add">
      <button class="btn cancel" v-on:click="closeForm">
        Cancel
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Relationship from "../classes/relationship";
import Vue, { PropType, defineComponent } from "vue";
import Service from "../classes/service";
import { appStore } from "../store/store";
import RelationshipDisplayer from "./RelationshipDisplayer.vue";
const { ipcRenderer } = window.require("electron");

export default defineComponent({
  components: {
    RelationshipDisplayer
  },
  data() {
    return {
      newRelationshipName: "",
      newRelationshipType: "",
      service1Name: "",
      service2Name: "",
      relationships: appStore.getters.getRelationships as Array<Relationship>,
      inputs: appStore.getters.getServicebyInput as Array<Service>,
      outputs: appStore.getters.getServicebyOutput as Array<Service>,
    };
  },
  methods: {
    expand: function (event) {
      var clickedElement = event.currentTarget;
      var content = clickedElement.lastChild.lastChild;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    },
    openForm: function () {
      document.getElementById("myForm").style.display = "block";
    },
    closeForm: function () {
      document.getElementById("myForm").style.display = "none";
    },
    saveRelationship: function (){
      let nRelationship = new Relationship(this.newRelationshipName, this.newRelationshipType, this.service1Name, this.service2Name);
      appStore.commit('addRelationship', nRelationship);
      (ipcRenderer as any).send("save-relationship", { name: nRelationship.name, jsonData: JSON.stringify(nRelationship) });
      this.closeForm();
    },
  },
});
</script>

<style scoped>
.form-popup {
  display: none;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

.form-container input[type="text"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

.form-container input[type="text"]:focus {
  background-color: #ddd;
  outline: none;
}

.form-container .btn {
  background-color: #04aa6d;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  opacity: 0.8;
}

.form-container .cancel {
  background-color: red;
}

.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}

body :not(#unblurred) {
  filter: blur(2px);
}
</style>
