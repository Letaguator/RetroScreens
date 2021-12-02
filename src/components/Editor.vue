<template>
    <div v-if="application === null" id="editor">
        <h2>Editor</h2>
        <p>Please open an Application in order to edit it</p>
    </div>
    <div v-else id="editor">
        <h2>Editor - Application: {{application.name}}</h2>
        <textarea v-model="application.src" :disabled="application.saved" />
        <div id="editorToolbar">
            <button v-on:click="wipeEditor">Clear</button>
            <button v-on:click="markDirty" :disabled="application.saved===false">Edit</button>
            <button v-on:click="saveApplication" :disabled="application.saved">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import App from "../classes/app";
const { ipcRenderer } = window.require("electron");

export default defineComponent({
    computed: {
        application(): App { return appStore.getters.getActiveApp }
    },
    methods: {
        async saveApplication() {
            (ipcRenderer as any).send("save-app", { name: this.application.name, src: this.application.src });

            this.application.flow = this.application.src.split("/n");
            this.application.saved = true;
        },
        markDirty() {
            this.application.saved = false;
        },
        wipeEditor() {
            this.application.saved = false;
            this.application.src = "";
            this.application.flow = [] as Array<string>;
        }
    }
})
</script>

<style scoped>
    h2, p
    {
        color: white;
    }

    button
    {
        height: 32px;
        width: 48px;
    }

    #editor
    {
        display: flex;
        flex-direction: column;
        width: 100%;
        background-color: #414E6B;
    }

    textarea
    {
        color: #ffffff;
        background-color: #323C52;
        resize: none;
        flex-grow: 1;
    }

    #editorToolbar
    {
        background-color: #495878;
        padding: 4px;;
    }
</style>
