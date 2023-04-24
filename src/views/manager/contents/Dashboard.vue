<template>
    <section>
        <div class="left-panel">
            <div class="author-card">
                <div class="img-box">
                    <div>
                        <img :src="config.avatar" alt="">
                    </div>
                    <div>
                        <h4> {{ config.author || '****' }}</h4>
                        <p>超级管理员</p>
                    </div>
                </div>
                <div class="login-info-box">
                    <p>上次登陆地点：<span>{{ state.lastLogin.location }}</span></p>
                    <p>上次登陆时间：<span>{{ state.lastLogin.createTime }}</span></p>
                </div>
            </div>
            <div class="summary-card">
                <div class="title">
                    <h4>文章分类数量</h4>
                </div>
                <DashboardArticleCategoryChart />
            </div>
        </div>
        <div class="right-panel">
            <div class="card-panels">
                <DashboardCards :article-count="config.articleCount" :category-count="config.categoryCount"
                    :tag-count="config.tagCount" :view-count="config.viewCount" />
            </div>
            <div class="access-statistical">
                <DashboardAccessChart />
            </div>
        </div>
    </section>
</template>


<script setup>
import { reactive } from 'vue';
import { useConfigStore } from '@/store';
import { list as listLogininfor } from '@/api/logininfor';
import { ElMessage } from 'element-plus';
import DashboardAccessChart from './DashboardAccessChart.vue';
import DashboardArticleCategoryChart from './DashboardArticleCategoryChart.vue'
import DashboardCards from './DashboardCards.vue';


let state = reactive({
    lastLogin: {
        location: '****',
        createTime: '****-**-** **:**:**'
    }
})

let { config } = useConfigStore()

// 获取登陆信息
listLogininfor().then(resp => {
    if (resp.code !== 200) {
        ElMessage.error(resp.msg)
    } else {
        let tempdata = resp.data.sort((a, b) => {
            return new Date(b.createTime) - new Date(a.createTime)
        })

        if (tempdata.length > 0) {
            state.lastLogin.location = tempdata[0].location
            state.lastLogin.createTime = tempdata[0].createTime
        }
    }
})
</script>
  
<style scoped>
section {
    display: flex;
    height: calc(100vh - 100px);
}

.left-panel {
    min-width: 320px;
    margin-right: 20px;
    display: flex;
    flex-direction: column;
}

.author-card {
    background-color: #fff;
    padding: 20px;
}

.author-card .img-box {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.author-card .img-box img {
    width: 100px;
    height: 100px;
    background-color: #ccc;
    border-radius: 4px;
}

.author-card .img-box div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.author-card .img-box h4 {
    font-size: 24px;
    font-weight: 700;
    text-transform: uppercase;
}

.author-card .img-box p {
    margin-top: 4px;
    color: rgb(56, 56, 56);
}

.author-card .login-info-box {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgb(175, 175, 175);
}

.author-card .login-info-box p {
    margin-top: 6px;
}

.summary-card {
    min-width: 320px;
    flex-grow: 1;
    margin-top: 20px;
    background-color: #fff;
}

.summary-card .title {
    padding: 10px;
    padding-left: 20px;
    padding-top: 14px;
    border-bottom: 1px solid #aaa;
}

.summary-card .title h4 {
    font-size: 18px;
    font-weight: 400;
    letter-spacing: 1px;
}

.summary-card #charts {
    width: calc(100% - 20px);
    height: calc(100% - 56px);
    margin: 0 auto;
}

.right-panel {
    width: calc(100% - 340px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
}

.right-panel .card-panels {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.card-panel {
    width: 24%;
    margin-bottom: 20px;
    background-color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
}

.right-panel .card-panel-icon-wrapper {
    width: 72px;
    height: 72px;
}

.right-panel .card-panel-description {
    font-weight: bold;
}

.card-panel-text {
    color: rgba(0, 0, 0, 0.45);
    font-size: 22px;
}

.card-panel-num {
    font-size: 26px;
    display: block;
    text-align: center;
}

/* 访问记录 */
.right-panel .access-statistical {
    margin-top: 20px;
    background-color: #fff;
    width: 100%;
    /* height: calc(100% - 132px); */
    flex-grow: 1;
    border-radius: 6px;
}

.author-card,
.summary-card,
.card-panel {
    border-radius: 6px;
}


@media only screen and (max-width: 875px) {
    .right-panel {
        display: none;
    }

    .left-panel {
        width: 100%;
    }
}

@media only screen and (max-width: 1200px) {

    .card-panel:nth-child(2),
    .card-panel:nth-child(3) {
        display: none;
    }

    .right-panel .card-panel {
        width: 49%;
    }
}

@media only screen and (max-width: 1550px) {
    .right-panel .card-panel {
        flex-direction: column;
    }

    .right-panel .access-statistical {
        height: calc(100% - 199px);
    }
}
</style>
