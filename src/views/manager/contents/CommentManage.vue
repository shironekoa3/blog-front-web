<template>
    <div class="menu" style="margin-bottom: 20px;">
        <el-button-group>
            <el-button type="primary" @click='handleRefreshList' :loading="isLoading">刷新列表</el-button>
        </el-button-group>
    </div>

    <!-- 列表表格 -->
    <el-table v-loading="isLoading" :data="tableData" stripe border style=" max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (page.current - 1) * page.size }}
            </template>
        </el-table-column>
        <el-table-column prop="articleTitle" label="文章" min-width="220" />
        <el-table-column prop="nick" label="昵称" min-width="140" />
        <el-table-column prop="content" label="内容" min-width="180" />
        <el-table-column prop="type" label="类型" width="80" align="center" />
        <el-table-column prop="rootId" label="父评论" min-width="80" align="center" />
        <el-table-column prop="website" label="网站" min-width="180" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" label="更新时间" min-width="180" />
        <el-table-column fixed="right" label="操作" width="80" align="center">
            <template #default="scope">
                <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :page-size="page.size" :page-count="page.count"
            v-model:current-page="page.current" style="padding-top: 14px;" />
    </div>
</template>
  
<script>
import { ref, reactive, toRefs, onMounted, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, del } from '../../../api/comment'
import timeFormater from 'time-formater'
export default {
    name: "CommentManage",
    setup() {
        let state = reactive({
            rawData: [],
            tableData: [],
            isLoading: false,
            page: {
                size: 10,
                current: 1,
                count: 0,
            }
        })

        // 删除
        const handleDelete = (row) => {
            ElMessageBox.confirm('确定要删除吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                let result = await del(row.id)
                if (result.data) {
                    ElMessage.success('操作成功！')
                } else {
                    ElMessage.error('操作失败，网络错误！')
                }
                handleRefreshList()
            }).catch(() => {
                // 取消
            })
        }

        // 刷新
        const handleRefreshList = async () => {
            state.isLoading = true
            let result = await list();
            if (result.status !== 200) {
                ElMessage.error('获取失败，网络错误！')
            } else {
                state.rawData = result.data
                state.rawData.forEach(item => {
                    item.createTime = timeFormater(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    item.updateTime = timeFormater(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                })
                state.page.count = Math.ceil(state.rawData.length / state.page.size)
            }
            state.isLoading = false;
        }

        watchEffect(() => {
            let start = (state.page.current - 1) * state.page.size
            state.tableData = state.rawData.slice(start, start + state.page.size)
        })

        handleRefreshList()

        return {
            ...toRefs(state),
            handleDelete,
            handleRefreshList
        }
    }
};
</script>

<style scoped></style>