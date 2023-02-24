<template>
    <div class="aside-container">
        <el-menu class="el-menu-vertical" :default-openeds="['article']" :default-active="active"
            :collapse-transition="false" :router="true">
            <el-menu-item index="/manager/dashboard">
                <el-icon>
                    <User />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
            <el-sub-menu index="article">
                <template #title>
                    <el-icon>
                        <Wallet />
                    </el-icon>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="/manager/article/edit/0">
                    <el-icon>
                        <DocumentAdd />
                    </el-icon>
                    <span>新建文章</span>
                </el-menu-item>
                <el-menu-item index="/manager/article/list">
                    <el-icon>
                        <Memo />
                    </el-icon>
                    <span>文章列表</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/manager/tag">
                <el-icon>
                    <PriceTag />
                </el-icon>
                <template #title>标签管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/category">
                <el-icon>
                    <CollectionTag />
                </el-icon>
                <template #title>分类管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/comment">
                <el-icon>
                    <ChatLineSquare />
                </el-icon>
                <template #title>评论管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/setting">
                <el-icon>
                    <setting />
                </el-icon>
                <template #title>站点设置</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: "mgraside",
    setup() {
        let active = ref('')
        let route = useRoute()
        active = route.path
        return {
            active
        }
    }
};
</script>

<style scoped>
.aside-container {
    width: 100%;
    height: calc(100vh - 60px);
}

.el-menu-vertical {
    height: 100%;
}
</style>