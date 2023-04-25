<template>
    <nav :style="{ 'background-color': style.navBgc }">
        <div class="nav-container">

            <div title="首页" @click="scrollToTop">
                <RouterLink to="/">
                    <el-avatar class="nav-img" :src="config.avatar" />
                </RouterLink>
            </div>

            <!-- 遍历生成菜单 -->
            <div class="nav-menu">
                <template v-for="( key, i ) in  Object.keys(config.nav) " :key="i">
                    <!-- 如果菜单的值是一个对象，则说明存在子菜单，需要遍历子菜单 -->
                    <div class="nav-menu-item" v-if="(config.nav[key] instanceof Object)">
                        <div class="dropdown">
                            <span class="dropdown-text" :style="{ 'color': style.fontColor }">
                                <i style="vertical-align: -2px;" v-if="key.includes('||')">
                                    <component :is="`i-${getIcon(key)}`" theme="outline" size="20"
                                        :fill="{ 'color': style.fontColor }" />
                                </i>
                                {{ getTitle(key) }}
                                <i style="vertical-align: -2px;"><i-down theme="outline" size="20"
                                        :fill="{ 'color': style.fontColor }" /></i>
                            </span>
                            <!-- 遍历子菜单 -->
                            <div class="dropdown-content">
                                <template v-for="( childKey, j ) in  Object.keys(config.nav[key]) " :key="j">
                                    <a :href="config.nav[key][childKey]"><span>{{ childKey }}</span></a>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="nav-menu-item" v-else>
                        <a :href="config.nav[key]">
                            <span class="nav-menu-item-nc" :title="getTitle(key)" :style="{ 'color': style.fontColor }">
                                <i style="vertical-align: -2px;" v-if="key.includes('||')">
                                    <component :is="`i-${getIcon(key)}`" theme="outline" size="20"
                                        :fill="{ 'color': style.fontColor }" />
                                </i>
                                {{ getTitle(key) }}
                            </span>
                        </a>
                    </div>
                </template>
            </div>

            <div class="nav-mobile-menu">
                <div class="icon-box" tabindex="1">
                    <svg t="1682348152538" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2657" width="30" height="30">
                        <path
                            d="M192.037 287.953h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32zM192.028 543.17h638.608c17.673 0 32-14.327 32-32s-14.327-32-32-32H192.028c-17.673 0-32 14.327-32 32s14.327 32 32 32zM832.161 735.802H192.037c-17.673 0-32 14.327-32 32s14.327 32 32 32h640.124c17.673 0 32-14.327 32-32s-14.327-32-32-32z"
                            fill="#fff" p-id="2658"></path>
                    </svg>
                </div>
            </div>
        </div>

    </nav>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue'
import { useConfigStore } from '@/store';
import { useRouter } from 'vue-router'


let { config } = useConfigStore()
let router = useRouter()

let state = reactive({

})
let style = reactive({
    navBgc: '#ffffff00',
    fontColor: '#fff'
})

function getTitle(key) {
    return key.includes('||') ? key.split('||')[0].trim() : key
}
function getIcon(key) {
    return key.includes('||') ? key.split('||')[1].trim() : ''
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function handleScroll() {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop
    if (scroll > 100) {
        style.navBgc = '#ffffffEE'
        style.fontColor = '#000'
    } else {
        style.navBgc = '#ffffff00'
        style.fontColor = '#fff'
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

</script>
<style scoped>
nav {
    width: 100vw;
    display: flex;
    justify-content: center;
    position: fixed;
    transition: background-color 0.3s;
    z-index: 999;
}

.nav-container {
    width: 100%;
    max-width: 1200px;
    height: 60px;
}

.nav-img {
    display: block;
    float: left;
    margin: 10px 0;
    margin-right: 20px;
    cursor: pointer;
}

.nav-menu {
    float: left;
    height: 60px;
}

.nav-menu-item {
    float: left;
    color: white;
    height: 100%;
    margin-left: 10px;
}

.nav-menu-item:first-child {
    margin-left: 0;
}

.nav-menu-item-nc {
    display: inline-block;
    padding: 18px 20px;
    transition: color 0.3s;
}

.dropdown {
    position: relative;
    cursor: pointer;
    width: 100px;
    text-align: center;
}

.dropdown .dropdown-text {
    display: inline-block;
    padding: 18px 0;
    width: 100px;
    transition: color 0.3s;
}

.dropdown:hover .dropdown-content {
    visibility: visible;
    margin-top: 0px;
    opacity: 1;
}

.dropdown:hover .dropdown-icon {
    transform: rotate(180deg);
}

.dropdown-content {
    visibility: hidden;
    width: 120px;
    position: absolute;
    left: -10px;
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.3s;
    margin-top: -10px;
    opacity: 0;
    overflow: hidden;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
    display: block;
    width: 100%;
    height: 40px;
    text-align: center;
    transition: all 0.3s;
}

.dropdown-content a:hover {
    background-color: #ddd;
}

.dropdown-content a span {
    display: inline-block;
    margin-top: 8px;
    padding: 0;
    color: #000;
}

.nav-mobile-menu {
    display: none;
}

.icon-box {
    float: left;
    border-radius: 4px;
    margin: 0 5px;
}

.icon-box:focus {
    background-color: #ffffff99;
}

@media (max-width: 1220px) {
    .nav-container {
        padding: 0 20px;
    }
}

@media (max-width: 768px) {
    .nav-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }

    .nav-menu {
        display: none;
    }

    .nav-mobile-menu {
        display: block;
    }
}
</style>
  