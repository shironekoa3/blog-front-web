<template>
    <div class="container">
        <!-- <div class="article-list">
            <div class="article-item" v-for="i in 5" style="margin-bottom: 20px;">
                <ArticleCard />
            </div>
        </div>
        <div class="pagination-box">
            <el-pagination class="pagination" background layout="prev, pager, next" :total="1000" />
        </div> -->
        <!-- <ArticleDetail /> -->
        <ArticleCopyright />
    </div>
</template>

<script>
import { reactive, toRefs, inject } from 'vue'
import ArticleCard from '../../../components/ArticleCard.vue';
import ArticleCopyright from '../../../components/ArticleCopyright.vue';
import ArticleDetail from '../../../components/ArticleDetail.vue';
export default {
    name: "HomeMainRight",
    components: {
        ArticleCard,
        ArticleDetail,
        ArticleCopyright
    },
    setup() {
        const state = reactive({

        })

        let config = inject('config')

        return {
            ...toRefs(state),
            config
        }

    }
};
</script>
<style >
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
.el-pagination button,
.el-pager li {
    font-size: 16px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, .1);
    border-radius: 4px;
    transition: all 0.3s;
}

.el-pagination button:hover,
.el-pager li:hover {
    transform: translate(0, -2px);
}

.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
    background-color: #fdbc40;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    background-color: #fff;
}
</style>
  