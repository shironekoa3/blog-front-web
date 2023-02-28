<template>
    <div class="menu" style="margin-bottom: 20px;">
        <el-button-group>
            <el-button type="primary" @click='handleNewArticle'>新建文章</el-button>
            <el-button type="primary" @click='handleRefreshList' :loading="isLoading">刷新列表</el-button>
        </el-button-group>
    </div>

    <!-- 文章列表表格 -->
    <el-table :data="tableData" v-loading="isLoading" stripe border style="width: 100%; max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (page.current - 1) * page.size }}
            </template>
        </el-table-column>
        <el-table-column prop="title" label="文章标题" min-width="200" />
        <el-table-column prop="category.name" label="文章分类" width="120" align="center" />
        <el-table-column prop="tagText" label="文章标签" min-width="180" />
        <el-table-column prop="viewCount" label="访问量" width="80" align="center" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" label="更新时间" min-width="180" />
        <el-table-column prop="isCommentText" label="评论" width="80" align="center" />
        <el-table-column prop="isTopText" label="置顶" width="80" align="center" />
        <el-table-column prop="statusText" label="隐藏" width="80" align="center" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="handleChange(scope.row.id)">编辑</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :page-size="page.size" :page-count="page.count"
            v-model:current-page="page.current" @current-change="handleRefreshList" style="padding-top: 14px;" />
    </div>
</template>
  
<script>
import { ref, reactive, toRefs, onMounted, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, change, del } from '../../../api/article'
import timeFormater from 'time-formater'
import { useRouter } from 'vue-router';
export default {
    name: "ArticleList",
    setup() {
        let router = useRouter()

        let state = reactive({
            rowData: [],
            tableData: [],
            isLoading: false,
            page: {
                size: 10,
                current: 1,
                count: 0,
            }
        })

        onMounted(() => {
            handleRefreshList()
        })

        const handleNewArticle = () => {
            router.push('/manager/article/edit/0')
        }

        const handleChange = (id) => {
            router.push(`/manager/article/edit/${id}`)
        }

        const handleDelete = (id) => {
            ElMessageBox.confirm('确定要删除吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                let result = await del(id)
                if (result.status !== 200) {
                    ElMessage.error('操作失败，网络错误！')
                } else {
                    ElMessage.success('操作成功！')
                }
                handleRefreshList()
            }).catch(() => {
                // 取消
            })
        }

        const handleRefreshList = async () => {
            state.isLoading = true
            let pageInfo = {
                'p': state.page.current,
                'size': state.page.size
            }
            let result = await list(pageInfo);
            if (result.status !== 200) {
                ElMessage.error('获取失败，网络错误！')
            } else {
                state.rowData = result.data.records
                state.rowData.forEach(item => {
                    item.createTime = timeFormater(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    item.updateTime = timeFormater(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                })
                state.page.count = result.data.pages
                state.tableData = state.rowData
                state.tableData.forEach(item => {
                    item.tagText = item.tags.map(tag => tag.name)
                    item.isCommentText = item.isComment ? '是' : '否'
                    item.isTopText = item.isTop ? '是' : '否'
                    item.statusText = item.status ? '是' : '否'
                })
            }
            state.isLoading = false;
        }

        return {
            ...toRefs(state),
            handleNewArticle,
            handleChange,
            handleDelete,
            handleRefreshList
        }
    }
};
</script>
