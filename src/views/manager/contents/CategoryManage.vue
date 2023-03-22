<template>
    <div class="menu" style="margin-bottom: 20px;">
        <el-button-group>
            <el-button type="primary" @click='openDialog(0)'>添加分类</el-button>
            <el-button type="primary" @click='handleRefreshList' :loading="state.isLoading">刷新列表</el-button>
        </el-button-group>
    </div>

    <!-- 列表表格 -->
    <el-table v-loading="state.isLoading" :data="state.tableData" stripe border style=" max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (state.page.current - 1) * state.page.size }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="分类名称" width="180" />
        <el-table-column prop="description" label="分类描述" min-width="240" />
        <el-table-column prop="articleCount" label="文章数量" min-width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" label="更新时间" min-width="180" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="openDialog(scope.row)">修改</el-button>
                <el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :page-size="state.page.size" :page-count="state.page.count"
            v-model:current-page="state.page.current" style="padding-top: 14px;" />
    </div>

    <!-- 添加/修改对话框 -->
    <el-dialog v-model="state.dialogVisible" :title="state.optionItem.id === 0 ? '添加' : '修改'" width="500"
        style="padding: 0 20px;">
        <el-form label-position="right" label-width="auto" style="max-width: 460px;">
            <el-form-item label="分类名称：">
                <el-input v-model="state.optionItem.name" placeholder="输入分类名称" />
            </el-form-item>
            <el-form-item label="分类描述：">
                <el-input v-model="state.optionItem.description" type="textarea" placeholder="输入分类描述" rows="5" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleChange">{{ state.optionItem.id === 0 ? '添加' : '修改' }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, change, del } from '../../../api/category'
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
const handleChange = () => {
    change(state.optionItem).then(resp => {
        console.log(resp);
        if (resp.code === 200) {
            ElMessage.success('操作成功！')
        } else {
            ElMessage.error(resp.msg)
        }
        state.dialogVisible = false
        handleRefreshList()
    }).catch(err => {
        console.log(err);
        ElMessage.error(err.msg)
        state.dialogVisible = false
        handleRefreshList()
    })
}

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm('确定要删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        if (row.articleCount > 0) {
            ElMessage.error('存在关联文章，请先在文章里删除引用。')
        } else {
            del(row.id).then(resp => {
                console.log(result);
                if (resp.code === 200) {
                    ElMessage.success('操作成功！')
                } else {
                    ElMessage.error(resp.msg)
                }
                handleRefreshList()
            })
        }
    }).catch(() => {
        // 取消
    })
}

// 刷新
const handleRefreshList = () => {
    state.isLoading = true
    list().then(resp => {
        if (resp.code !== 200) {
            ElMessage.error(resp.msg)
        } else {
            state.rowData = resp.data
            console.log(state.rowData)
            state.page.count = Math.ceil(state.rowData.length / state.page.size)
        }
        state.isLoading = false;
    })

}

watchEffect(() => {
    let start = (state.page.current - 1) * state.page.size
    state.tableData = state.rowData.slice(start, start + state.page.size)
})
</script>

<style scoped></style>