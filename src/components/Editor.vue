<template>
    <h2 v-if="application === null">Editor</h2>
    <div v-else id="editor">
        <h2>Editor - Application: {{application.name}}</h2>
        <textarea />
    </div>
</template>

<script lang="ts">
import Vue, { PropType, defineComponent } from "vue";
import { appStore } from "../store/store";
import App from "../classes/app";

export default defineComponent({
    computed: {
        application(): App { return appStore.getters.getActiveApp }
    }
})
</script>

<style scoped>
    #editor
    {
        display: flex;
        flex-direction: column;
    }
</style>
