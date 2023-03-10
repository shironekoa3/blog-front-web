<template>
    <div class="article-card">
        <div class="content-box" :style="{ marginRight: article.thumbnail === '' ? '0' : '300px' }">
            <span class="article-top" v-if="article.isTop">置顶</span>
            <!-- <RouterLink :to="article.link" class="title">{{ article.title }}</RouterLink> -->
            <a class="title" style="cursor: pointer;" @click="router.push(article.link)">{{ article.title }}</a>
            <div class="info-box" style="margin: 10px 0;">
                <div class="info-box-item">
                    <calendar theme="filled" size="18" fill="#fdbc40" style="vertical-align: -3px; margin-right: 4px;" />
                    <span>发表于{{ article.createTime }}</span>
                </div>
                <div class="info-box-item">
                    <category-management theme="filled" size="18" fill="#fc625d"
                        style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.category.name }}</span>
                </div>
                <div class="info-box-item" v-if="article.tags.length > 0">
                    <bookmark-one theme="filled" size="18" fill="#35cd4b"
                        style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.tags.map(item => item.name).join('·') }}</span>
                </div>
                <div class="info-box-item">
                    <camera-one theme="filled" size="18" fill="#73aaff" style="vertical-align: -3px; margin-right: 4px;" />
                    <span>{{ article.viewCount }}</span>
                </div>
            </div>
            <div class="summary-box">
                <p>{{ article.summary }}</p>
            </div>
        </div>
        <div class="img-box" :style="{ backgroundImage: `url(${article.thumbnail})` }" v-if="article.thumbnail !== ''">
            <!-- <img src="/images/54.webp" alt=""> -->
        </div>
    </div>
</template>

<script>
import { Calendar, CategoryManagement, BookmarkOne, CameraOne } from '@icon-park/vue-next';
import { useRouter } from 'vue-router';
export default {
    name: "ArticleCard",
    components: { Calendar, CategoryManagement, BookmarkOne, CameraOne },
    props: {
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
    },
    setup() {
        let router = useRouter()
        return {
            router
        }
    }
};
</script>
<style scoped>
.article-card {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
    padding: 40px 40px 60px;
    position: relative;
    max-height: 148px;
}

.title {
    color: #303133;
    font-size: 28px;
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
}

.info-box-item {
    margin-left: 10px;
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
    font-weight: 100;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);

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
</style>