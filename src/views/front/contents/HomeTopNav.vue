<template>
    <div class="nav-container">
        <nav>
            <a href="/" title="首页">
                <el-avatar class="nav-img" :src="config.avatar" />
            </a>
            <div class="nav-menu" v-if="JSON.stringify(config) !== '{}'">
                <template v-for="(key, i) in Object.keys(config.nav)" :id="i">
                    <div class="nav-menu-item" v-if="!(config.nav[key] instanceof Object)">
                        <a :href="config.nav[key]">
                            <span class="nav-menu-item-nc" :title="key"
                                :style="{ 'color': config.isHeaderHidden ? '#666' : '#fff' }">
                                <i style="vertical-align: -2px;" v-if="key.includes('||')">
                                    <component :is="`i-${key.split('||')[1].trim()}`" theme="outline" size="20"
                                        :fill="config.isHeaderHidden ? '#666' : '#fff'" />
                                </i>
                                {{ key.includes('||') ? key.split('||')[0].trim() : key }}
                            </span>
                        </a>
                    </div>
                    <div class="nav-menu-item" v-else>
                        <div class="dropdown">
                            <span class="dropdown-text" :style="{ 'color': config.isHeaderHidden ? '#666' : '#fff' }">
                                <i style="vertical-align: -2px;" v-if="key.includes('||')">
                                    <component :is="`i-${key.split('||')[1].trim()}`" theme="outline" size="20"
                                        :fill="config.isHeaderHidden ? '#666' : '#fff'" />
                                </i>
                                {{ key.includes('||') ? key.split('||')[0].trim() : key }}
                                <i style="vertical-align: -2px;">
                                    <i-down theme="outline" size="20" :fill="config.isHeaderHidden ? '#666' : '#fff'" />
                                </i>
                            </span>
                            <div class="dropdown-content">
                                <template v-for="(childKey, j) in Object.keys(config.nav[key])" :id="j">
                                    <a :href="config.nav[key][childKey]">
                                        <span>
                                            {{ childKey }}
                                        </span>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { useConfigStore } from '@/store';

let { config } = useConfigStore()

</script>
<style scoped>
.nav-container {
    width: 100%;
    display: flex;
    justify-content: center;
}

nav {
    width: 1200px;
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
</style>
  