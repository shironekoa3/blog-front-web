<template>
    <header :class="{ 'header-hidden': config.isHeaderHidden }"
        :style="{ backgroundImage: config.isHeaderHidden ? 'url()' : `url(${config.headerImg})` }">
        <HomeTopNav :config="config" />
        <div v-if="!config.isHeaderHidden" class="information">
            <h3>{{ config.title }}</h3>
            <p>{{ config.description }}</p>
        </div>
    </header>
</template>

<script>
import { reactive, toRefs } from 'vue'
import HomeTopNav from '../../../components/HomeTopNav.vue'
export default {
    name: "HomeTop",
    components: {
        HomeTopNav
    },
    props: ['config'],
    setup(props) {
        const state = reactive({
        })
        console.log(props.config);
        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped>
header {
    height: 420px;
    background-size: cover;
    background-position: center;
}

.header-hidden {
    height: 60px;
    background-color: #fff;
}

.information {
    color: white;
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 80px;
    font-size: 36px;
}

.information p {
    font-size: 24px;
    margin-top: 20px;
}
</style>
  