<template>
    <div id="app" class="app">
        <app-header />
        <router-view/>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import AppHeader from "@/components/AppHeader.vue";
    import {Component} from "vue-property-decorator";

    @Component({
        components: {
            AppHeader
        }
    })
    export default class App extends Vue {}
</script>

<style lang="scss" scoped>
    .app {
        @include font-regular();
        text-align: center;
        color: #222;
    }
</style>