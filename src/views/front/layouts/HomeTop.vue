<template>
    <header :class="{ 'header-hidden': config.isHeaderHidden }" :style="{ backgroundImage: `url(${getHeadImg()})` }">
        <HomeTopNav :config="config" />
        <div v-if="!config.isHeaderHidden" class="information">
            <h3>{{ config.currArticle.id ? config.currArticle.title : config.title }}</h3>
            <div v-if="config.currArticle.id" class="info-box" style="margin: 10px 0;">
                <div class="info-box-item">
                    <calendar theme="filled" size="18" fill="#fdbc40" style="vertical-align: -3px; margin-right: 4px;" />
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
                    <camera-one theme="filled" size="18" fill="#73aaff" style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ config.currArticle.viewCount }}</span>
                </div>
            </div>
            <p v-else>{{ config.description }}</p>
        </div>
    </header>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
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
        })

        let config = inject('config')


        const getHeadImg = () => {
            let imgUrl = ''
            if (!config.isHeaderHidden) {
                if (config.currArticle.id && config.currArticle.thumbnail) {
                    imgUrl = config.currArticle.thumbnail
                } else {
                    imgUrl = config.headerImg
                }
            }
            return imgUrl
        }

        return {
            ...toRefs(state),
            config,
            getHeadImg
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
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 80px;
}

.information h3 {
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
  