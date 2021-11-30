<template>
  <div>
    <ul id="listOfThings">
      <li v-for="item in items" :key="item.name">
        {{ item.name }}
        <div class="card" v-on:click="expand($event)">
          <!-- <img src="" alt=""> -->
          <div class="container">
            <h4>{{ item.name }}</h4>
            <h4>{{ item.type }}</h4>
            <div class="content" id="unblurred">
              <p>Service 1: {{ item.serv1 }}</p>
              <p>Service 2: {{ item.serv2 }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <button class="open-button" v-on:click="openForm()">Add New</button>

  <div class="form-popup" id="myForm">
    <form action="/action_page.php" class="form-container">
      <h4>Create a Relationship</h4>

      <label for="ServiceName">Service Name</label>
      <input
        type="text"
        placeholder="Select here"
        name="ServiceName"
        required
      />

      <label for="ServiceType">Service Type</label>
      <select name="ServiceType" id="ServiceType">
        <option value="Control">Control</option>
        <option value="Drive">Drive</option>
        <option value="Support">Support</option>
        <option value="Contest">Contest</option>
      </select>
      <br /><br />
      <label for="ServiceType">Select Service 1</label>
      <select name="ServiceType" id="ServiceType">
        <option>Select Here</option>
        <option v-for="input in inputs" :key="input.name">
        {{ input.name }} </option>
      </select>
      <br /><br />
      <label for="ServiceType">Select Service 2</label>
      <select name="ServiceType" id="ServiceType">
        <option>Select Here</option>
        <option v-for="output in outputs" :key="output.name">
        {{ output.name}} </option>
      </select>
      <br /><br />
      <button type="submit" class="btn">Add</button>
      <button type="button" class="btn cancel" v-on:click="closeForm()">
        Cancel
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Relationship from "../classes/relationship";
import Service from "../classes/service";
import { appStore } from "../store/store";


export default {
  data() {
    return {
      items: appStore.getters.getRelationships as Array<Relationship>,
      inputs: appStore.getters.getServicebyInput as Array<Service>,
      outputs: appStore.getters.getServicebyOutput as Array<Service>,
    };
  },
  methods: {
    expand: function (event) {
      var clickedElement = event.currentTarget;
      //console.log(clickedElement.lastChild);
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
  },
};
</script>

<style scoped>
ul {
  list-style-type: none;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 100%;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}

.open-button {
  background-color: #555;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  opacity: 0.8;
  bottom: 23px;
  right: 28px;
  width: 280px;
}

/* The popup form - hidden by default */
.form-popup {
  display: none;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
}

/* Add styles to the form container */
.form-container {
  max-width: 300px;
  padding: 10px;
  background-color: white;
}

/* Full-width input fields */
.form-container input[type="text"],
.form-container input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type="text"]:focus,
.form-container input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
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

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover,
.open-button:hover {
  opacity: 1;
}

body :not(#unblurred) {
  filter: blur(2px);
}
</style>
