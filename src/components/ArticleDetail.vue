<template>
    <div class="article-detail-box">
        <nav>
            <i-home theme="filled" size="18" fill="#fdbc40" style="vertical-align: -3px; margin-right: 4px;" />
            <RouterLink to="/">首页</RouterLink>
            <span> / </span>
            <a href="/">{{ article.category.name }}</a>
            <span> / </span>
            <span style="color: #73aaff">正文</span>
        </nav>
        <div class="article-main">
            <MdEditor v-model="article.content" class="article-md-edit" preview-only />
        </div>
    </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { RouterLink, useRouter } from 'vue-router';

defineProps({
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
            content: '默认文章内容'
        },
        type: Object
    }
})
let router = useRouter()

function returnToHome() {
    router.push('/')
}
</script>
<style scoped>
.article-detail-box {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    transition: 0.3s;
    color: #303133;
}

nav {
    padding: 15px 20px;
    border-bottom: 1px solid #e4e7ed;
}

nav a,
nav span {
    color: #606266;
    text-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
    transition: color 0.3s;
}

nav a:hover {
    color: #73aaff;
}

.article-main {
    padding: 20px;
}
</style>