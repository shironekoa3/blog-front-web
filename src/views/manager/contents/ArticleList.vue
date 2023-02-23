<template>
    <div class="menu" style="margin-bottom: 20px;">
        <el-button-group>
            <el-button type="primary" @click='handleNewArticle'>新建文章</el-button>
            <el-button type="primary" @click='handleRefreshList' :loading="isLoading">刷新列表</el-button>
        </el-button-group>
    </div>

    <!-- 文章列表表格 -->
    <el-table :data="tableData" stripe border style="width: 100%; height: 522px; max-height: calc(100vh - 212px);">
        <el-table-column prop="id" label="文章编号" width="100" align="center" />
        <el-table-column prop="title" label="文章标题" width="280" />
        <el-table-column prop="date" label="发布时间" width="180" />
        <el-table-column prop="category" label="文章分类" width="180" />
        <el-table-column prop="tag" label="文章标签" min-width="200" />
        <el-table-column prop="count" label="阅读量" width="120" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default>
                <el-button link type="primary" size="small" @click="">编辑</el-button>
                <el-button link type="danger" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :total="332" style="padding-top: 14px;" />
    </div>
</template>
  
<script>
import { ref, reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: "ArticleList",
    setup() {
        let router = useRouter()
        let tableData = reactive([
            {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }, {
                id: '1',
                title: '文章1',
                date: '2022-02-22 22:22:33',
                category: '教程',
                tag: ['Vue', 'SpringBoot', 'Test'],
                count: 33
            }
        ])

        function handleNewArticle() {
            router.push('/manager/article/new')
        }

        let isLoading = ref(false)
        function handleRefreshList() {
            isLoading.value = true
            setTimeout(() => {
                isLoading.value = false;
            }, 1000)
        }

        return {
            tableData,
            isLoading,
            handleNewArticle,
            handleRefreshList
        }
    }
};
</script>
