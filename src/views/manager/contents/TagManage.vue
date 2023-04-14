<template>
    <div class="menu" style="margin-bottom: 20px;">
        <div style="float: left; margin-right: 40px; margin-bottom: 20px;">
            <el-button-group>
                <el-button type="primary" size="large" @click='openDialog(0)'>添加标签</el-button>
                <el-button type="primary" size="large" @click='handleRefreshList'
                    :loading="state.isLoading">刷新列表</el-button>
            </el-button-group>
        </div>
        <div style="float: left;">
            <el-form size="large" :inline="true" @submit.native.prevent>
                <el-form-item label="">
                    <el-input v-model="state.searchText" @keyup.enter.native="handleRefreshList" placeholder="按名称或描述搜索">
                        <template #append>
                            <el-button type="primary" @click="handleRefreshList">搜索</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 文章列表表格 -->
    <el-table v-loading="state.isLoading" :data="state.tableData" stripe border style="max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (state.page.current - 1) * state.page.size }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="标签名称" width="180" />
        <el-table-column prop="description" label="标签描述" min-width="240" />
        <el-table-column prop="refCount" label="引用次数" min-width="100" align="center" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" label="更新时间" min-width="180" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="large" @click="openDialog(scope.row)">修改</el-button>
                <el-button link type="danger" size="large" @click="handleDelete(scope.row)">删除</el-button>
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
        <el-form size="large" label-position="right" label-width="auto" style="max-width: 460px;">
            <el-form-item label="标签名称：">
                <el-input v-model="state.optionItem.name" placeholder="输入标签名称" />
            </el-form-item>
            <el-form-item label="标签描述：">
                <el-input v-model="state.optionItem.description" type="textarea" placeholder="输入标签描述" rows="5" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button size="large" @click="state.dialogVisible = false">取消</el-button>
                <el-button type="primary" size="large" @click="handleChange">{{ state.optionItem.id === 0 ? '添加' : '修改'
                }}</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, onMounted, watchEffect, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, change, del } from '../../../api/tag'

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
    searchText: '',
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
    if (state.optionItem.name === '') {
        ElMessage.warning('名称不能为空！')
    } else {
        change(state.optionItem).then(resp => {
            if (resp.code === 200) {
                ElMessage.success('操作成功！')
            } else {
                ElMessage.error(resp.msg)
            }
            state.dialogVisible = false
            handleRefreshList()
        })
    }
}

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm('确定要删除吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        if (row.refCount > 0) {
            ElMessage.error('存在关联文章，请先在文章里删除引用。')
        } else {
            del(row.id).then(resp => {
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
    let param = {
        searchKey: state.searchText
    }
    list(param).then(resp => {
        if (resp.code !== 200) {
            ElMessage.error(resp.msg)
        } else {
            state.rowData = resp.data
            state.page.count = Math.ceil(state.rowData.length / state.page.size)
            let start = (state.page.current - 1) * state.page.size
            state.tableData = state.rowData.slice(start, start + state.page.size)
        }
        state.isLoading = false;
    })
}

watch(() => state.page.current, () => {
    state.tableData = []
    state.isLoading = true
    setTimeout(() => {
        let start = (state.page.current - 1) * state.page.size
        state.tableData = state.rowData.slice(start, start + state.page.size)
        state.isLoading = false
    }, 200);
})
</script>

<style scoped></style>