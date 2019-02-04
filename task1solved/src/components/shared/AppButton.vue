<template>
    <button type="button" class="button" v-on="$listeners"><slot /></button>
</template>
<script lang="ts">
    export default {
        name: "app-button"
    };
</script>
<style scoped lang="scss">
    .button {
        border: 0;
        background-color: $color-base;
        border-radius: 3px;
        color: white;
        padding: 7px 20px;
        font-size: 16px;
        transition: background-color 100ms ease;
        cursor: pointer;

        &:hover {
            background-color: lighten($color-base, 5%);
        }
    }
</style>