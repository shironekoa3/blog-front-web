<template>
    <div class="common-layout">
      <el-container>
        <el-header style="width: 100%; padding: 0; position: fixed; z-index: 999;">
          <MgrTop />
        </el-header>
        <el-container>
          <el-aside width="200px" style="position: fixed; top: 60px;">
            <MgrAside />
          </el-aside>
          <el-main style="margin-left: 200px; margin-top: 60px; background-color: #f0f2f5;">
            <MgrContent />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
<script>
// import { reactive, toRefs, onMounted } from "vue";
// import { useRouter, useRoute } from "vue-router";
// import { listHomeBooks } from "@/api/home";
// import { ElMessage, ElLoading } from "element-plus";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import LatestNews from "@/components/home/LatestNews";
// import FriendLink from "@/components/home/FriendLink";
// import BookVisitRank from "@/components/home/BookVisitRank";
// import BookNewestRank from "@/components/home/BookNewestRank";
// import BookUpdateRank from "@/components/home/BookUpdateRank";

import MgrTop from './layouts/MgrTop.vue';
import MgrAside from './layouts/MgrAside.vue';
import MgrContent from './layouts/MgrContent.vue';

export default {
    name: "mgrmain",
    components: {
      MgrTop, MgrAside, MgrContent
    },
    setup() {
        let name = '张三'
        let age = 18

        function hello() {
          console.log('hello');
        }

        return {
          hello
        }
    }
};
</script>

<style scoped>


</style>