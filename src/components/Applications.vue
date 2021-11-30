<template>
  <div>
    <ApplicationDisplayer v-for="application in applications" v-bind:key="application.name" v-bind:application="application"/>
  </div>
  <div>
    <input type="text" v-model="newAppName" />
    <button v-on:click="createApplication">Create Application</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import App from "../classes/app";
import ApplicationDisplayer from "./ApplicationDisplayer.vue";

export default defineComponent({
  components: {
    ApplicationDisplayer
  },
  methods: {
    createApplication() {
      if(this.newAppName.length > 1 && this.newAppName.length <= 16)
      {
        let app = new App(this.newAppName, [] as Array<string>);
        this.applications.push(app);
        this.newAppName = "";
      }
      else{
        alert("App name must be between 2 and 16 chars");
      }
    }
  },
  data() {
    return {
      newAppName: "",
      applications: [
        new App("TriggerAlarms", [
          "S serviceA",
          "S serviceB",
          "R relationshipC",
        ]),
        new App("BeepTweet", [
          "S serviceX",
          "S serviceY",
          "S ServiceC",
          "R relationshipC",
        ]),
      ],
    };
  }
});

</script>

<style scoped>
ul {
  list-style-type: none;
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
/* .form-popup {
  display: none;
  bottom: 0;
  right: 15px;
  border: 3px solid #f1f1f1;
  z-index: 9;
} */

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

.subtab {
  float: left;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 20%;
  height: auto;
}

/* Style the buttons that are used to open the tab content */
.subtab button {
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
.subtab button:hover {
  background-color: rgb(255, 185, 139);
}

/* Create an active/current "tab button" class */
.subtab button.active {
  background-color: rgb(255, 185, 139);
}

/* Style the tab content */
.subtabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 80%;
  border-left: none;
  height: auto;
}
</style>
