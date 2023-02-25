<template>
    <main>
        <HomeMainLeft />
    </main>
</template>

<script>
import { reactive, toRefs } from 'vue'
import HomeCard from '../../../components/HomeCard.vue';
import HomeMainLeft from './HomeMainLeft.vue'
export default {
    name: "HomeMain",
    components: {
        HomeMainLeft
    },
    setup(props) {
        const state = reactive({
        })

        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped>
main {
    width: 1200px;
    height: 500px;
    margin: 20px auto 0;
}
</style>
  