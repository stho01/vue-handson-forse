<template>
    <div class="product-table">TODO edit {{product.name}}</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from "vue-property-decorator";
    import AppButton from "@/components/shared/AppButton.vue";

    @Component({
        components: {AppButton}
    })
    export default class ProductEditor extends Vue {

        /*




         */
    }
</script>
<style scoped lang="scss">
    .product-table {}
</style>