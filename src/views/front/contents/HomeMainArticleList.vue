<template>
    <div class="article-list" v-box-loading="isLoading">
        <div class="article-item" v-for="(article, i) in config.articles" :id="i" style="margin-bottom: 20px;">
            <ArticleCard :article="article" />
        </div>
    </div>
    <div class="pagination-box">
        <!-- <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" /> -->
        <el-pagination class="pagination" background layout="prev, pager, next" :page-size="page.size"
            :page-count="page.count" v-model:current-page="page.current" @current-change="refreshArticlePage" />
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ArticleCard from '../../../components/ArticleCard.vue';
import { useConfigStore } from '../../../store';
import { listHome } from '../../../api/article';
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
    listHome({ p: page.current, size: page.size }).then(response => {
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
</script>

<style>
.article-list {
    min-height: 500px;
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
  