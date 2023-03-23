<template>
    <div class="top-container">
        <h1>BLOG</h1>
        <div class="top-info">
            <el-dropdown class="top-dropdown">
                <div class="top-dropdown-box">
                    <div class="top-avatar">
                        <el-avatar v-if="config.avatar == ''">{{ config.author.substring(0, 1) }}</el-avatar>
                        <el-avatar v-if="config.avatar != ''" :src="config.avatar" />
                    </div>
                    <span>{{ config.author }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="userLogout">退出登陆</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
  
<script setup>
import { useConfigStore } from '../../../store';
import { logout } from '../../../api/user'
import { ElMessage } from 'element-plus';

let { config } = useConfigStore()

function userLogout() {
    logout.then(resp => {
        if (resp.code !== 200) {
            ElMessage.error(resp.msg)
        } else {
            ElMessage.success('退出登录成功！')
            setTimeout(() => {
                window.location.href = '/'
            }, 1200);
        }
    })
}

</script>

<style scoped>
.top-container {
    width: 100%;
    height: 60px;
    background-color: #001529;
}

.top-container h1 {
    line-height: 60px;
    color: white;
    float: left;
    padding-left: 20px;
    font-weight: 100;
}


.top-info {
    width: 140px;
    height: 60px;
    position: absolute;
    right: 0;
    margin-right: 20px;
    transition: background-color 0.3s;
    cursor: pointer;
}

.top-info:hover {
    background-color: #252a3d;
}

.top-dropdown-box:focus {
    outline: none;
}

.top-avatar {
    padding: 10px 10px;
    float: left;
}

.top-info span {
    line-height: 60px;
    font-weight: 100;
    color: white;
}
</style>