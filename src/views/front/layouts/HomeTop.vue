<template>
    <header :class="{ 'header-hidden': config.isHeaderHidden }" :style="{ backgroundImage: `url(${headerImg})` }">
        <HomeTopNav />
        <div v-if="!config.isHeaderHidden" class="information">
            <h3>{{ config.currArticle.id ? config.currArticle.title : config.title }}</h3>
            <div v-if="config.isShowDescription">
                <!-- 如果 currArticle 没有值，则显示网站描述。否则显示文章标签 -->
                <p v-if="!config.currArticle.id">{{ config.description }}</p>
                <div v-else class="info-box" style="margin: 10px 0;">
                    <div class="info-box-item">
                        <i-calendar theme="filled" size="18" fill="#fdbc40"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.createTime }}</span>
                    </div>
                    <div class="info-box-item">
                        <i-category-management theme="filled" size="18" fill="#fc625d"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.category.name }}</span>
                    </div>
                    <div class="info-box-item" v-if="config.currArticle.tags.length > 0">
                        <i-bookmark-one theme="filled" size="18" fill="#35cd4b"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.tags.map(item => item.name).join('·') }}</span>
                    </div>
                    <div class="info-box-item">
                        <i-camera-one theme="filled" size="18" fill="#73aaff"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.viewCount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useConfigStore } from '../../../store';
import HomeTopNav from '../contents/HomeTopNav.vue'

let headerImg = ref('')

let { config } = useConfigStore()


watchEffect(() => {
    if (!config.isHeaderHidden) {
        if (config.currArticle.id && config.currArticle.thumbnail) {
            headerImg.value = config.currArticle.thumbnail
        } else {
            headerImg.value = config.headerImg
        }
    }
})

</script>
<style scoped>
header {
    height: 420px;
    background-size: cover;
    background-position: center;
    background-color: #6dc1f7;
}

.header-hidden {
    height: 60px;
    background-color: #fff;
}

.information {
    color: white;
    width: 100%;
    height: calc(100% - 60px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.information h3 {
    margin-top: -50px;
    letter-spacing: 5px;
    font-size: 36px;
}

.information p {
    font-size: 22px;
    margin-top: 20px;
}

.information .info-box {
    display: flex;
    justify-content: center;
}

.information .info-box-item {
    margin-left: 15px;
}

.information .info-box-item:nth-child(1) {
    margin-left: 0;
}
</style>
  