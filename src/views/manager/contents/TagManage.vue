<template>
    <div class="menu" style="margin-bottom: 20px;">
        <el-button-group>
            <el-button type="primary" @click='openDialog(0)'>添加标签</el-button>
            <el-button type="primary" @click='handleRefreshList' :loading="isLoading">刷新列表</el-button>
        </el-button-group>
    </div>

    <!-- 文章列表表格 -->
    <el-table v-loading="isLoading" :data="tableData" stripe border style=" max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (page.current - 1) * page.size }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="标签名称" width="180" />
        <el-table-column prop="description" label="标签描述" min-width="240" />
        <el-table-column prop="refCount" label="引用次数" min-width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" label="更新时间" min-width="180" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="openDialog(scope.row)">修改</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :page-size="page.size" :page-count="page.count"
            v-model:current-page="page.current" style="padding-top: 14px;" />
    </div>

    <!-- 添加/修改对话框 -->
    <el-dialog v-model="dialogVisible" :title="optionItem.id === 0 ? '添加' : '修改'" width="500" style="padding: 0 20px;">
        <el-form label-position="right" label-width="auto" style="max-width: 460px;">
            <el-form-item label="标签名称：">
                <el-input v-model="optionItem.name" placeholder="输入标签名称" />
            </el-form-item>
            <el-form-item label="标签描述：">
                <el-input v-model="optionItem.description" type="textarea" placeholder="输入标签描述" rows="5" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleChange">{{ optionItem.id === 0 ? '添加' : '修改' }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ref, reactive, toRefs, onMounted, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, change, del } from '../../../api/tag'
import timeFormater from 'time-formater'
export default {
    name: "TagManage",
    setup() {
        let state = reactive({
            rowData: [],
            tableData: [],
            optionItem: {
                id: 0,
                name: '',
                description: ''
            },
            dialogVisible: false,
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

        // 打开对话框
        const openDialog = (row) => {
            if (row === 0) {
                state.optionItem.id = 0
                state.optionItem.name = ''
                state.optionItem.description = ''
            } else {
                state.optionItem.id = row.id
                state.optionItem.name = row.name
                state.optionItem.description = row.description
            }
            state.dialogVisible = true
        }

        // 添加 & 修改
        const handleChange = async () => {
            let result = await change(state.optionItem)
            // console.log(result);
            if (result.status !== 200) {
                ElMessage.error('操作失败，网络错误！')
            } else {
                ElMessage.success('操作成功！')
            }
            state.dialogVisible = false
            handleRefreshList()
        }

        // 删除
        const handleDelete = (id) => {
            ElMessageBox.confirm('确定要删除吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(async () => {
                let result = await del(id)
                // console.log(result);
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

        // 刷新
        const handleRefreshList = async () => {
            state.isLoading = true
            let result = await list();
            if (result.status !== 200) {
                ElMessage.error('获取失败，网络错误！')
            } else {
                state.rowData = result.data
                state.rowData.forEach(item => {
                    item.createTime = timeFormater(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    item.updateTime = timeFormater(item.updateTime).format('YYYY-MM-DD HH:mm:ss')
                })
                state.page.count = Math.ceil(state.rowData.length / state.page.size)
            }
            state.isLoading = false;
        }

        watchEffect(() => {
            let start = (state.page.current - 1) * state.page.size
            state.tableData = state.rowData.slice(start, start + state.page.size)
        })

        return {
            ...toRefs(state),
            openDialog,
            handleChange,
            handleDelete,
            handleRefreshList,
        }
    }
};
</script>

<style scoped></style>