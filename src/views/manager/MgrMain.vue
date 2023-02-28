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
import MgrTop from './layouts/MgrTop.vue';
import MgrAside from './layouts/MgrAside.vue';
import MgrContent from './layouts/MgrContent.vue';

export default {
    name: "mgrmain",
    components: {
      MgrTop, MgrAside, MgrContent
    },
    setup() {
        return {

        }
    }
};
</script>

<style scoped>


</style>