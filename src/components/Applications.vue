<template>
<div>
  <ul id="listOfThings">
  <li v-for="item in items" :key="item.name">
    {{ item.message }}
    <div class="card" v-on:click="expand($event)">
      <!-- <img src="" alt=""> -->
      <div class="container">
      <h4>{{item.name}}</h4>
      <div class="content">
        <button type="button">Play/Pause</button>
        <button type="button">Stop</button>
        <button type="button">Edit</button>
        <button type="button">Delete</button>
      </div>
    </div>
    </div>
  </li>
  </ul>
</div>

<button class="open-button" v-on:click="openForm()">Add New</button>

<div class="form-popup" id="appForm">
  <form action="/action_page.php" class="form-container">
    <h4>Create a Relationship</h4>

    <label for="ServiceName">Application Name</label>
    <input type="text" placeholder="Select a name" name="ServiceName" required>

    <label for="ServiceType">Routine</label>
    <textarea id="w3review" name="w3review" rows="4" cols="50">
      Routine must be in format (write grammar here)
    </textarea>
    <br><br>

    <button type="submit" class="btn">Add</button>
    <button type="button" class="btn cancel" v-on:click="closeForm()">Cancel</button>
  </form>
</div>


</template>

<script>
import {Application} from "../classes/app.ts"

export default {
  data() {
    return {
      items: [
        // new Application("Lighting Ambience Check"),
        // new Application("Trigger all alarms",makeUL(["S serviceA","S serviceB","R relationshipC"])),
        // new Application("Beep on new tweet",makeUL(["S serviceA","S serviceB","R relationshipC"]))
      ]
    };
  },
  methods:{
    expand: function (event){
      var clickedElement = event.currentTarget;
      //console.log(clickedElement.lastChild);
      var content = clickedElement.lastChild.lastChild;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    },
    openForm: function (){
      document.getElementById("appForm").style.display = "block";
    },
    closeForm: function() {
      document.getElementById("appForm").style.display = "none";
    }
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width:100%;
}

.content {
  padding: 0 18px;
  display: none;
  overflow: hidden;
  background-color: #f1f1f1;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
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
.form-container input[type=text], .form-container input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  border: none;
  background: #f1f1f1;
}

/* When the inputs get focus, do something */
.form-container input[type=text]:focus, .form-container input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit/login button */
.form-container .btn {
  background-color: #04AA6D;
  color: white;
  padding: 16px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-bottom:10px;
  opacity: 0.8;
}

/* Add a red background color to the cancel button */
.form-container .cancel {
  background-color: red;
}

/* Add some hover effects to buttons */
.form-container .btn:hover, .open-button:hover {
  opacity: 1;
}
</style>
