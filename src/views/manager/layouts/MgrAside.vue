<template>
    <div class="aside-container">
        <el-menu class="el-menu-vertical" :default-openeds="['article']" :default-active="active"
            :collapse-transition="false" :router="true">
            <el-menu-item index="/manager/dashboard">
                <el-icon>
                    <home theme="outline" size="24" fill="#333" />
                </el-icon>
                <template #title>首页</template>
            </el-menu-item>
            <el-sub-menu index="article">
                <template #title>
                    <el-icon>
                        <list-view theme="outline" size="24" fill="#333" />
                    </el-icon>
                    <span>文章管理</span>
                </template>
                <el-menu-item index="/manager/article/edit/0">
                    <el-icon>
                        <editor theme="outline" size="24" fill="#333" />
                    </el-icon>
                    <span>新建文章</span>
                </el-menu-item>
                <el-menu-item index="/manager/article/list">
                    <el-icon>
                        <view-list theme="outline" size="24" fill="#333" />
                    </el-icon>
                    <span>文章列表</span>
                </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/manager/tag">
                <el-icon>
                    <tag theme="outline" size="24" fill="#333" />
                </el-icon>
                <template #title>标签管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/category">
                <el-icon>
                    <category-management theme="outline" size="24" fill="#333" />
                </el-icon>
                <template #title>分类管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/comment">
                <el-icon>
                    <comment theme="outline" size="24" fill="#333" />
                </el-icon>
                <template #title>评论管理</template>
            </el-menu-item>
            <el-menu-item index="/manager/setting">
                <el-icon>
                    <setting-one theme="outline" size="24" fill="#333" />
                </el-icon>
                <template #title>站点设置</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Home, ListView, Editor, ViewList, CategoryManagement, Tag, Comment, SettingOne } from '@icon-park/vue-next'


export default {
    name: "mgraside",
    components: {
        Home, ListView, Editor, ViewList, CategoryManagement, Tag, Comment, SettingOne
    },
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