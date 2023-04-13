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
        <div class="footer-box" v-for="(item, i) in config.footer.split('\n')" :id="i">{{ item }}</div>
    </footer>
</template>

<script setup>
import { useConfigStore } from '../../store'
import HomeMainLeft from './layouts/HomeMainLeft.vue';
import HomeMainRight from './layouts/HomeMainRight.vue';
import HomeTop from './layouts/HomeTop.vue';

let { config } = useConfigStore()

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
    font-size: 16px;
    letter-spacing: 1px;
    color: #606266;
    margin-bottom: 5px;
    /* text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25); */
}
</style>