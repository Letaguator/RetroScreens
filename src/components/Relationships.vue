<template>
<div>
  <ul id="listOfThings">
  <li v-for="item in items" :key="item.name">
    {{ item.message }}
    <div class="card" v-on:click="expand($event)">
      <!-- <img src="" alt=""> -->
      <div class="container">
      <h4>{{item.name}}</h4>
      <h4>{{item.type}}</h4> 
      <div class="content">
        <p>Service 1: {{item.serv1}}</p>
        <p>Service 2: {{item.serv2}}</p>
      </div>
    </div>
    </div>
  </li>
  </ul>
</div>
</template>

<script>
import {Relationship} from "../classes/relationship.ts"
export default {
  data() {
    return {
      items: [
        new Relationship("Control","control","temperature","led"),
        new Relationship("Drive","drive","distancesensor","buzzer")
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
</style>
