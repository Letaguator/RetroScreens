<template>
  <div>
    <div class="subtab">
      <button
        class="subtablinks"
        v-for="item in items"
        :key="item.name"
        v-on:click="reveal($event, item.name)"
      >
        {{ item.name }}
      </button>
      <button
        class="subtablinks"
        id="createApp"
        v-on:click="reveal($event, 'appForm')"
      >
        Add New
      </button>
    </div>
  </div>

  <div
    class="subtabcontent"
    v-for="item in items"
    :key="item.name"
    v-bind:id="item.name"
  >
    <strong> {{ item.name }} </strong>
    <p v-for="i in item.flow" :key="i.flow">{{ i }}</p>
    <button type="button">Play/Pause</button>
    <button type="button">Delete</button>
    <button type="button">Edit</button>
  </div>

  <div class="subtabcontent" id="appForm">
    <form action="" class="form-container">
      <h4>Create a Relationship</h4>

      <label for="ServiceName">Application Name</label>
      <input
        type="text"
        placeholder="Select a name"
        name="ServiceName"
        required
      />

      <label for="ServiceType">Routine</label>
      <textarea id="w3review" name="w3review" rows="4" cols="50">
      Routine must be in format (write grammar here)
    </textarea
      >
      <br /><br />

      <button type="submit" class="btn">Add</button>
      <!-- <button type="button" class="btn cancel" v-on:click="closeForm()">Cancel</button> -->
    </form>
  </div>
</template>

<script>
import App from "../classes/app.ts";

export default {
  data() {
    return {
      items: [
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
  },
  methods: {
    reveal: function (evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("subtabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("subtablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      console.log(tabName);
      document.getElementById(tabName).style.display = "block";
      //console.log('element with id'+tabName+'now visible');
      evt.currentTarget.className += " active";
    },
    // openForm: function (){
    //   document.getElementById("appForm").style.display = "block";
    // }
    // closeForm: function() {
    //   document.getElementById("appForm").style.display = "none";
    // }
  },
};

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("createApp").click();
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
