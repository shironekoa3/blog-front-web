<template>
    <div class="menu" style="margin-bottom: 20px;">
        <div style="float: left; margin-right: 40px; margin-bottom: 20px;">
            <el-button-group>
                <el-button type="primary" size="large" @click='handleRefreshList'
                    :loading="state.isLoading">刷新列表</el-button>
            </el-button-group>
        </div>
        <div style="float: left;">
            <el-form size="large" :inline="true" @submit.native.prevent>
                <el-form-item label="">
                    <el-input v-model="state.searchText" @keyup.enter.native="handleRefreshList" placeholder="搜索评论">
                        <template #append>
                            <el-button type="primary" @click="handleRefreshList">搜索</el-button>
                        </template>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>

    <!-- 列表表格 -->
    <el-table v-loading="state.isLoading" :data="state.tableData" stripe border style="max-height: calc(100vh - 212px);">
        <el-table-column label="编号" width="100" align="center">
            <template #default="scope">
                {{ scope.$index + 1 + (state.page.current - 1) * state.page.size }}
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
                <el-button link type="danger" size="large" @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>

    <!-- 分页结构 -->
    <div style="height: 60px;">
        <el-pagination layout="prev, pager, next" :page-size="state.page.size" :page-count="state.page.count"
            v-model:current-page="state.page.current" style="padding-top: 14px;" />
    </div>
</template>
  
<script setup>
import { reactive, watchEffect } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { list, del } from '../../../api/comment'


let state = reactive({
    rawData: [],
    tableData: [],
    isLoading: false,
    searchText: '',
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
        del(row.id).then(resp => {
            if (resp.code === 200) {
                ElMessage.success('操作成功！')
            } else {
                ElMessage.error(resp.ElMessage)
            }
            handleRefreshList()
        })
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
            state.rawData = resp.data
            state.page.count = Math.ceil(state.rawData.length / state.page.size)
        }
        state.isLoading = false;
    })
}

watchEffect(() => {
    let start = (state.page.current - 1) * state.page.size
    state.tableData = state.rawData.slice(start, start + state.page.size)
})

handleRefreshList()

</script>

<style scoped></style>