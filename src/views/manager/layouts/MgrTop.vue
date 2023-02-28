<template>
    <div class="top-container">
        <h1>BLOG</h1>
        <div class="top-info">
            <div class="top-avatar">
                <el-avatar v-if="config.avatar == ''">{{ config.author.substring(0, 1) }}</el-avatar>
                <el-avatar v-if="config.avatar != ''" :src="config.avatar" />
            </div>
            <p>{{ config.author }}</p>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useConfigStore } from '../../../store';
export default {
    name: "mgrtop",
    setup() {
        let { config } = useConfigStore()
        return {
            config
        }
    }
};
</script>

<style scoped>
.top-container {
    width: 100%;
    height: 60px;
    background-color: #3c8dbc;
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
}

.top-avatar {
    padding: 10px 10px;
    float: left;
}

.top-info p {
    line-height: 60px;
    font-weight: 100;
    color: white;
}
</style>