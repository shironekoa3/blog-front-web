<template></template>

<script>
import { reactive, toRefs, onMounted } from 'vue';

export default {
    name: "",
    setup() {
        const state = reactive({
        })

        return {
            ...toRefs(state),
        }
    }
};
</script>
<style scoped></style>
  