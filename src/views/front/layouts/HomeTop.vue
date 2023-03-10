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
                        <calendar theme="filled" size="18" fill="#fdbc40"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>发表于 {{ config.currArticle.createTime }}</span>
                    </div>
                    <div class="info-box-item">
                        <category-management theme="filled" size="18" fill="#fc625d"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.category.name }}</span>
                    </div>
                    <div class="info-box-item" v-if="config.currArticle.tags.length > 0">
                        <bookmark-one theme="filled" size="18" fill="#35cd4b"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.tags.map(item => item.name).join('·') }}</span>
                    </div>
                    <div class="info-box-item">
                        <camera-one theme="filled" size="18" fill="#73aaff"
                            style="vertical-align: -3px; margin-right: 4px;" />
                        <span>{{ config.currArticle.viewCount }}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import { reactive, toRefs, watchEffect } from 'vue'
import { useConfigStore } from '../../../store';
import { Calendar, CategoryManagement, BookmarkOne, CameraOne } from '@icon-park/vue-next';
import HomeTopNav from '../contents/HomeTopNav.vue'
export default {
    name: "HomeTop",
    components: {
        HomeTopNav,
        Calendar, CategoryManagement, BookmarkOne, CameraOne
    },
    setup() {
        const state = reactive({
            headerImg: '',
        })

        let { config } = useConfigStore()


        watchEffect(() => {
            if (!config.isHeaderHidden) {
                if (config.currArticle.id && config.currArticle.thumbnail) {
                    state.headerImg = config.currArticle.thumbnail
                } else {
                    state.headerImg = config.headerImg
                }
            }
        })

        return {
            ...toRefs(state),
            config
        }
    }
};
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
  