<template>
    <app-button @click.prevent="goBack">Tilbake</app-button>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from "vue-property-decorator";
    import AppButton from "@/components/shared/AppButton.vue";
    @Component({
        components: {AppButton}
    })
    export default class BackButton extends Vue {

        /**
         * Navigate user back to previous route
         */
        protected goBack(event: Event): void {
            this.$router.back();
        }

    }
</script>