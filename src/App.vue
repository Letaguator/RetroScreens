<template>
  <div>
    <div class="tab">
      <button class="tablinks" v-on:click="reveal(event, 'Things')" id="defaultOpen">
        Things
      </button>
      <button class="tablinks" v-on:click="reveal(event, 'Services')">
        Services
      </button>
      <button class="tablinks" v-on:click="reveal(event, 'Relationships')">
        Relationships
      </button>
      <button class="tablinks" v-on:click="reveal(event, 'Applications')">
        Applications
      </button>
      <button class="tablinks" v-on:click="reveal(event, 'Console')">
        Console
      </button>
    </div>

    <div id="Things" class="tabcontent">
      <Things />
    </div>

    <div id="Services" class="tabcontent">
      <Services />
    </div>

    <div id="Relationships" class="tabcontent">
      <Relationships />
    </div>

    <div id="Applications" class="tabcontent">
      <Applications />
    </div>

    <div id="Console" class="tabcontent">
      <Console />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Things from "./components/Things.vue";
import Services from "./components/Services.vue";
import Relationships from "./components/Relationships.vue";
import Applications from "./components/Applications.vue";
import LogWindow from "./components/LogWindow.vue";

@Options({
  components: {
    Things,
    Services,
    Relationships,
    Applications,
    LogWindow,
  },
  methods: {
    reveal: function (evt, tabName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }
      document.getElementById(tabName).style.display = "block";
      //evt.currentTarget.className += " active";
    },
  },
})
export default class App extends Vue {}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("defaultOpen").click();
});

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  box-sizing: border-box;
}

/* Style the tab */
.tab {
  float: left;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  width: 30%;
  height: 300px;
}

/* Style the buttons that are used to open the tab content */
.tab button {
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
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current "tab button" class */
.tab button.active {
  background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
  float: left;
  padding: 0px 12px;
  border: 1px solid #ccc;
  width: 70%;
  border-left: none;
  height: 300px;
}
</style>
