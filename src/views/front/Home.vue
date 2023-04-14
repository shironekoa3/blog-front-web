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
    <div class="right-menu">
        <div class="menu-item" @click="scrollToTop">
            <svg t="1681397521257" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="20372" width="25" height="25">
                <path
                    d="M796.422846 524.478323 537.312727 265.185862c-6.368176-6.39914-14.688778-9.471415-22.976697-9.407768-1.119849-0.096331-2.07972-0.639914-3.19957-0.639914-4.67206 0-9.024163 1.087166-13.023626 2.879613-4.032146 1.536138-7.87163 3.872168-11.136568 7.135385L227.647682 524.27706c-12.512727 12.480043-12.54369 32.735385-0.032684 45.248112 6.239161 6.271845 14.432469 9.407768 22.65674 9.407768 8.191587 0 16.352211-3.135923 22.624056-9.34412L479.1356 363.426421l0 563.712619c0 17.695686 14.336138 31.99914 32.00086 31.99914s32.00086-14.303454 32.00086-31.99914L543.13732 361.8576l207.91012 207.73982c6.240882 6.271845 14.496116 9.440452 22.687703 9.440452s16.319527-3.103239 22.560409-9.311437C808.870206 557.277355 808.902889 536.989329 796.422846 524.478323z"
                    fill="#575B66" p-id="20373"></path>
                <path
                    d="M864.00258 192 160.00258 192c-17.664722 0-32.00086-14.336138-32.00086-32.00086S142.337858 128 160.00258 128l704 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.698266 192 864.00258 192z"
                    fill="#575B66" p-id="20374"></path>
            </svg>
        </div>
        <div class="menu-item" @click="toHome" style="margin-top: 10px;">
            <svg t="1681396769401" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="19390" width="25" height="25">
                <path
                    d="M640 896h192V469.376h42.666667V896.213333c0 23.466667-19.029333 42.474667-42.666667 42.474667H597.333333V725.333333h-170.666666v213.333334H192c-23.573333 0-42.666667-18.986667-42.666667-42.453334V469.354667h42.666667V896h192V682.666667h256v213.333333z"
                    fill="#3D3D3D" p-id="19391"></path>
                <path
                    d="M100.032 506.133333a21.333333 21.333333 0 1 1-29.397333-30.933333L466.282667 99.349333a66.688 66.688 0 0 1 91.434666 0L953.386667 475.2a21.333333 21.333333 0 1 1-29.397334 30.933333L528.341333 130.282667a24.021333 24.021333 0 0 0-32.682666 0L100.053333 506.133333zM832 192h-128a21.333333 21.333333 0 0 1 0-42.666667h149.333333a21.333333 21.333333 0 0 1 21.333334 21.333334v149.333333a21.333333 21.333333 0 0 1-42.666667 0V192z"
                    fill="#3D3D3D" p-id="19392"></path>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useConfigStore } from '../../store';
import { useRoute, useRouter } from 'vue-router';
import HomeMainLeft from './layouts/HomeMainLeft.vue';
import HomeMainRight from './layouts/HomeMainRight.vue';
import HomeTop from './layouts/HomeTop.vue';

let { config } = useConfigStore()
let router = useRouter()
let route = useRoute()

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function toHome() {
    console.log(route);
    scrollToTop();
    router.push('/');
}

window.onscroll = () => {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    let rMenuButtons = document.getElementsByClassName("right-menu")[0];
    if (scroll > 300) {
        rMenuButtons.classList.add("right-menu-active");
    } else {
        rMenuButtons.classList.remove("right-menu-active");
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
}

.right-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    right: 40px;
    bottom: 160px;
}

.menu-item {
    width: 25px;
    height: 25px;
    opacity: 0;
    background-color: #fff;
    padding: 10px;
    cursor: pointer;
    border-radius: 4px;
    transform: translateX(50px);
    transition: background-color .3s, transform .3s, opacity 0.5s;
}

.menu-item:nth-child(2) {
    transition: background-color .3s, transform .4s, opacity 0.5s;
}

.menu-item:hover {
    background-color: #fdbc40;
}

.menu-item:hover path {
    fill: #fff;
}

.right-menu-active .menu-item {
    opacity: 1;
    transform: translateX(0px);
}
</style>