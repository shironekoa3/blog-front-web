<template>
    <HomeTop />
    <main>
        <div class="main-left">
            <HomeMainLeft />
        </div>
        <div class="main-right">
            <HomeMainRight />
        </div>
    </main>
    <footer>
        <div class="footer-box">2020-2023丨备案号</div>
        <div class="footer-box">本站由 SpringBoot2 + Vue 3 开发</div>
        <div class="footer-box">总访问量：9999 次丨作者：向日葵</div>
    </footer>
</template>

<script>
import { reactive, toRefs, provide, computed, onBeforeMount, watchEffect } from 'vue';
import { useConfigStore } from '../../store'
import HomeMainLeft from './layouts/HomeMainLeft.vue';
import HomeMainRight from './layouts/HomeMainRight.vue';
import HomeTop from './layouts/HomeTop.vue';

export default {
    name: "home",
    components: {
        HomeTop,
        HomeMainLeft,
        HomeMainRight
    },
    setup() {
        const state = reactive({
        })

        let { config } = useConfigStore()

        return {
            ...toRefs(state)
        }

    }
};
</script>
<style scoped>
main {
    width: 1200px;
    margin: 20px auto 40px;
    display: flex;
    justify-content: space-between;
    position: relative;
}

.main-right {
    width: 880px;
    /* background-color: rgba(255, 0, 0, 0.1); */
}

footer {
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}

.footer-box {
    font-size: 14px;
    font-weight: 100;
    letter-spacing: 1px;
    color: #606266;
    margin-bottom: 5px;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
}
</style>