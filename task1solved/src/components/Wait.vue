<template>
    <div class="wait">
        <loader />
        <div>{{message}}</div>
    </div>
</template>
<script lang="ts">
    import Loader from "@/components/Loader.vue";

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
