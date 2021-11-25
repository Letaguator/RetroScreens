<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  <ejs-tab id='draggableTab' heightAdjustMode='Auto' :allowDragAndDrop="true" dragArea="#container">
  <e-tabitems>
      <e-tabitem :header="headerText0" :content="content0"></e-tabitem>
      <e-tabitem :header="headerText1" :content="content1"></e-tabitem>
      <e-tabitem :header="headerText2" :content="content2"></e-tabitem>
  </e-tabitems>
  </ejs-tab>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import { TabComponent, TabItemsDirective, TabItemDirective } from "@syncfusion/ej2-vue-navigations";
import "../node_modules/@syncfusion/ej2-base/styles/material.css";
/*import "../node_modules/@syncfusion/ej2-vue-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-vue-popups/styles/material.css";*/
import "../node_modules/@syncfusion/ej2-vue-navigations/styles/material.css"

import HelloWorld from "./components/HelloWorld.vue";

// @Options({
//   components: {
//     HelloWorld,
//   },
// })


export default {
     name: "App",
     components: {
       "ejs-tab": TabComponent,
       "e-tabitems": TabItemsDirective,
       "e-tabitem": TabItemDirective
    },
data() {
return {

    headerText0: { text: "Things" },
    headerText1: { text: "Services" },
    headerText2: { text: "Relationships" },
    content0:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet nisl justo, et ullamcorper lacus pellentesque eu.",

    content1:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet nisl justo, et ullamcorper lacus pellentesque eu.",

    content2:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet nisl justo, et ullamcorper lacus pellentesque eu."
  }
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .e-tab .e-content .e-item {
    padding: 10px;
    text-align: justify;
    font-size: 12px;
}
</style>

