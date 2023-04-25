<template>
    <header :style="{ backgroundImage: `url(${headerImg})` }">
        <div class="information">
            <h3>{{ config.currArticle.id ? config.currArticle.title : config.title }}</h3>
            <!-- 如果 currArticle 没有值，则显示网站描述。否则显示文章标签 -->
            <p v-if="!config.currArticle.id">{{ config.description }}</p>
            <div v-else class="info-box" style="margin: 10px 0;">
                <div class="info-box-item">
                    <i-calendar theme="filled" size="18" fill="#fdbc40" style="vertical-align: -3px; margin-right: 4px;" />
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
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import { useConfigStore } from '../../../store';

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
    width: 100vw;
    height: 420px;
    background-size: cover;
    background-position: center;
    background-color: #6dc1f7;
    transition: background-image 0.5s;
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
    letter-spacing: 5px;
    font-size: 36px;
    animation: textFadeIn 1s;
    transition: all 2s;
}

@keyframes textFadeIn {
    0% {
        transform: translateY(-100px);
    }

    100% {
        transform: translateY(0);
    }
}

.information p {
    font-size: 22px;
    margin-top: 20px;
}

.information .info-box {
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
}

.information .info-box-item {
    margin-right: 15px;
}

@media (max-width: 768px) {
    .information h3 {
        padding: 0 20px;
    }

    .information .info-box {
        justify-content: left;
    }

    .information .info-box-item {
        margin-right: 10px;
    }
}
</style>
  