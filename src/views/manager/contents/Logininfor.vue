<template>
  <div class="login-records">
    <el-table v-loading="state.isLogininforLoading" :data="state.tableData" stripe border style="height: 100%;">
      <el-table-column label="编号" width="60" align="center">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" min-width="120" />
      <el-table-column prop="ipaddr" label="IP地址" min-width="120" align="center" />
      <el-table-column prop="location" label="位置" min-width="120" />
      <el-table-column prop="browser" label="浏览器" min-width="120" align="center" />
      <el-table-column prop="os" label="系统" min-width="120" />
      <el-table-column prop="createTime" label="登陆时间" width="180" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { list as listLogininfor } from '@/api/logininfor';

let state = reactive({
  isLogininforLoading: true,
  tableData: [],
})

// 获取登陆信息
listLogininfor().then(resp => {
  if (resp.code !== 200) {
    ElMessage.error(resp.msg)
  } else {
    state.tableData = resp.data.sort((a, b) => {
      return new Date(b.createTime) - new Date(a.createTime)
    })
    state.isLogininforLoading = false
  }
})
</script>

<style scoped></style>
