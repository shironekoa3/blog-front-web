<template>
    <div class="article-filter-text" v-if="config.search.type.length !== 0">
        {{ config.search.keyword }}
        <div class="article-filter-return" style="float: left;" @click="clearSearch">
            &lt; 返回列表
        </div>
    </div>
    <div class="article-list" v-box-loading="isLoading">
        <div class="article-item" v-for="(article, i) in config.articles" :key="i" style="margin-bottom: 20px;">
            <ArticleCard :article="article" />
        </div>
    </div>
    <div class="pagination-box" v-if="config.articles.length > 0">
        <!-- <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" /> -->
        <el-pagination class="pagination" background layout="prev, pager, next" :page-size="page.size"
            :page-count="page.count" v-model:current-page="page.current" @current-change="refreshArticlePage" />
    </div>
</template>

<script setup>
import { ref, reactive, watch, watchEffect } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue';
import { useConfigStore } from '@/store';
import { listHome } from '@/api/article';
import { useRouter } from 'vue-router';

let page = reactive({
    count: 0,
    size: 5,
    current: 1
})
let isLoading = ref(true)

let { config } = useConfigStore()
let router = useRouter()

const refreshArticlePage = () => {
    // 延迟500ms加载第二页
    isLoading.value = true

    // 获取文章数据
    let param = {
        p: page.current,
        size: page.size,
        type: config.search.type,
        keyword: config.search.keyword
    }
    listHome(param).then(response => {
        if (response.code !== 200) {
            ElMessage.error(response.msg)
        } else {
            page.count = response.data.pages
            config.articles = response.data.records.map(i => {
                i.link = `/article/${i.id}`
                return i
            })
            isLoading.value = false

            // 滚动
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // })
        }
    })
}
refreshArticlePage()

watch([() => config.search.type, () => config.search.keyword], () => {
    refreshArticlePage();
})

const clearSearch = () => {
    config.search.type = ''
    config.search.keyword = ''
}

</script>

<style>
.article-filter-text {
    border-radius: 6px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    background-color: #ffffff;
    overflow: hidden;
    color: #303133;
    padding: 20px;
    font-size: 24px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
    text-align: center;
    margin-bottom: 20px;
    position: relative;
}

.article-filter-return {
    position: absolute;
    left: 30px;
    top: 25px;
    color: #303133;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s;
}

.article-filter-return:hover {
    color: #73aaff;
}

.article-item {
    margin-top: 0;
    transition: all 0.5s;
}

.article-item:hover {
    transform: translate(0, -2px);
}

.pagination-box {
    padding: 20px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
}

/* 分页插件样式修改 */
.pagination-box .el-pagination button,
.pagination-box .el-pager li {
    font-size: 16px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    border-radius: 4px;
    transition: all 0.3s;
}

.pagination-box .el-pagination button:hover,
.pagination-box .el-pager li:hover {
    transform: translate(0, -2px);
}

.pagination-box .el-pagination.is-background .btn-next.is-active,
.pagination-box .el-pagination.is-background .btn-prev.is-active,
.pagination-box .el-pagination.is-background .el-pager li.is-active {
    background-color: #fdbc40;
}

.pagination-box .el-pagination.is-background .btn-next,
.pagination-box .el-pagination.is-background .btn-prev,
.pagination-box .el-pagination.is-background .el-pager li {
    background-color: #fff;
}
</style>
  