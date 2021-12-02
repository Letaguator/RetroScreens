<template>
    <div id="tabDiv">
        <div>
            <h2>IoT - Explorer</h2>
        </div>
        <div class="tab">
            <button id="defaultOpen" class="tablinks" v-on:click="reveal($event, 'Applications')">
                Applications
            </button>
            <button class="tablinks" v-on:click="reveal($event, 'Things')" >
                Things
            </button>
            <button class="tablinks" v-on:click="reveal($event, 'Services')">
                Services
            </button>
            <button class="tablinks" v-on:click="reveal($event, 'Relationships')">
                Relationships
            </button>
            <button class="tablinks" v-on:click="reveal($event, 'Console')">
                Console
            </button>
        </div>

        <div id="Applications" class="tabcontent">
            <Applications />
        </div>

        <div id="Relationships" class="tabcontent">
            <Relationships />
        </div>

        <div id="Things" class="tabcontent">
            <Things />
        </div>

        <div id="Services" class="tabcontent">
            <Services />
        </div>

        <div id="Console" class="tabcontent">
            <Console />
        </div>
  </div>
</template>


<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import Things from "./Things.vue";
import Services from "./Services.vue";
import Relationships from "./Relationships.vue";
import Applications from "./Applications.vue";
import Console from "./Console.vue";


export default defineComponent({
    components: {
        Things,
        Services,
        Relationships,
        Applications,
        Console
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
        evt.currentTarget.className += " active";
        },
    }
})
</script>


<style scoped>
    h2, p {
        color: white;
    }

    #tabDiv {
        border-right: 1px solid #97B5F7;
        background-color: #7087B8;
        width: 350px;
    }
    * {
        box-sizing: border-box;
    }
    .tab {
        display: flex;
        flex-direction: row;
        float: left;
        border: 1px solid #ccc;
        background-color: #f1f1f1;
        width: 100%;
    }

    .tab button {
        display: block;
        background-color: inherit;
        color: black;
        padding: 8px 4px;
        width: 100%;
        border: none;
        outline: none;
        text-align: left;
        cursor: pointer;
        transition: 0.3s;
    }

    .tab button:hover {
        background-color: #ddd;
    }

    .tab button.active {
        background-color: #ccc;
    }

    .tabcontent {
        float: left;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-left: none;
        height: auto;
    }
</style>