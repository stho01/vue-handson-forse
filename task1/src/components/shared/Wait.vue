<template>
    <div class="wait">
        <loader />
        <slot>{{message}}</slot>
    </div>
</template>
<script lang="ts">
    import Loader from "./Loader.vue";

    export default {
        name: "wait",
        components: {Loader},
        props: {
            message: {
                type: String
            }
        }
    }
</script>
