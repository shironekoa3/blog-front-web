<template>
    <div class="article-card">
        <div class="content-box">
            <span class="article-top" v-if="article.isTop">置顶</span>
            <!-- <RouterLink :to="article.link" class="title">{{ article.title }}</RouterLink> -->
            <a class="title" style="cursor: pointer;" @click="router.push(article.link)">{{ article.title }}</a>
            <div class="info-box">
                <div class="info-box-item">
                    <i-calendar theme="filled" size="18" fill="#fdbc40" style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.createTime }}</span>
                </div>
                <div class="info-box-item">
                    <i-category-management theme="filled" size="18" fill="#fc625d"
                        style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.category.name }}</span>
                </div>
                <div class="info-box-item" v-if="article.tags.length > 0">
                    <i-bookmark-one theme="filled" size="18" fill="#35cd4b"
                        style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.tags.map(item => item.name).join('·') }}</span>
                </div>
                <div class="info-box-item">
                    <i-camera-one theme="filled" size="18" fill="#73aaff"
                        style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.viewCount }}</span>
                </div>
            </div>
            <div class="summary-box">
                <p>{{ article.summary }}</p>
            </div>
        </div>
        <div class="img-container" v-if="article.thumbnail !== ''">
            <div class="img-box" :style="{ backgroundImage: `url(${article.thumbnail})` }">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
    article: {
        default: {
            id: 1,
            link: '/article/1',
            title: '默认文章标题',
            summary: '默认文要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要默认文章摘要~~',
            createTime: '2023-01-01',
            thumbnail: '/images/54.webp',
            category: {
                id: 0,
                name: '默认分类'
            },
            tags: [
                { id: 0, name: '标签1' },
                { id: 0, name: '标签2' }
            ],
            viewCount: 999,
        },
        type: Object
    }
})

let router = useRouter()

</script>
<style scoped>
.article-card {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
    padding: 35px 40px 50px;
    position: relative;
    display: flex;
    justify-content: space-between;
}

.content-box {
    flex: 1;
}

.title {
    color: #303133;
    font-size: 26px;
    letter-spacing: 2px;
    font-weight: 400;
    cursor: pointer;
    transition: 0.3s;
}

.title:hover {
    color: #73aaff;
}

.article-top {
    font-size: 18px;
    margin-right: 6px;
    padding: 2px 12px;
    position: relative;
    top: -4px;
    color: #ffffff;
    user-select: none;
    background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
    border-radius: 4px;
}


.info-box {
    display: flex;
    flex-wrap: wrap;
    margin: 12px 0;
}

.info-box-item {
    margin-right: 10px;
    font-size: 16px;
    color: #8a8a8a;
}

.info-box-item:nth-child(1) {
    margin-left: 0;
}

.summary-box p {
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    letter-spacing: 1px;
}

.img-container {
    width: 280px;
    height: 100px;
}

.img-box {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 100%;
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .article-card {
        flex-direction: column-reverse;
        padding-left: 20px;
        padding-right: 20px;
    }

    .img-container {
        width: 100%;
        height: 280px;
    }

    .img-box {
        width: 100%;
        height: 300px;
    }
}
</style>