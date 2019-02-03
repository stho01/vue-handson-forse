<template>
    <button class="button" type="button" @click.prevent="goBack">Tilbake</button>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";

    @Component
    export default class BackButton extends Vue {

        /**
         * Navigate user back to previous route
         */
        protected goBack(event: Event): void {
            this.$router.back();
        }

    }
</script>