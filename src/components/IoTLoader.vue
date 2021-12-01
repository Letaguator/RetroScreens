<template>
<div>
    <h1>{{message}}</h1>
</div>
</template>

<script>
import Vue, { PropType, defineComponent } from "vue";

export default defineComponent({
    data() {
        message: "Fetching IoT information.."
    }
})
</script>

<style scoped>
    h1
    {
        background-color: white;
    }
    div
    {
        background-color: #414e6b;
    }
</style>
