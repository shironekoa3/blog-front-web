<template>
    <div class="article-list">
        <BoxLoading :isLoading="isLoading" />
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

<script>
import { reactive, toRefs, inject } from 'vue';
import ArticleCard from '../../../components/ArticleCard.vue';
import { useConfigStore } from '../../../store';
import { get, listHome } from '../../../api/article';
import timeFormater from 'time-formater'
import { useRouter } from 'vue-router';
export default {
    name: "HomeMainArticleList",
    components: {
        ArticleCard
    },
    setup() {
        const state = reactive({
            page: {
                count: 0,
                size: 5,
                current: 1
            },
            isLoading: true
        })

        let { config } = useConfigStore()
        let router = useRouter()

        const refreshArticlePage = () => {
            // 延迟500ms加载第二页
            state.isLoading = true

            setTimeout(() => {
                // 获取文章数据
                listHome({ p: state.page.current, size: state.page.size }).then(response => {
                    if (response.status !== 200) {
                        ElMessage.error('文章获取失败！')
                    } else {
                        state.page.count = response.data.pages
                        config.articles = response.data.records.map(i => {
                            i.createTime = timeFormater(i.createTime).format('YYYY-MM-DD')
                            i.updateTime = timeFormater(i.updateTime).format('YYYY-MM-DD')
                            i.link = `/article/${i.id}`
                            return i
                        })
                        state.isLoading = false

                        // 滚动
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        })
                    }
                })
            }, 500);

        }

        refreshArticlePage()

        return {
            ...toRefs(state),
            config,
            refreshArticlePage
        }

    }
};
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
  