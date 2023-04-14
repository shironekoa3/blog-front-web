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
                    <p>上次登陆地点：<span>{{ state.tableData[0]?.location || '****' }}</span></p>
                    <p>上次登陆时间：<span>{{ state.tableData[0]?.createTime || '****-**-** **:**:**' }}</span></p>
                </div>
            </div>
            <div class="summary-card">
                <div class="title">
                    <h4>文章分类数量</h4>
                </div>
                <div class="charts" id="charts" v-loading="state.isChartLoading">

                </div>
            </div>
        </div>
        <div class="right-panel">
            <div class="card-panels">
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper">
                        <list-view theme="outline" size="72" fill="#333" :strokeWidth="2" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            文章数量
                        </div>
                        <count-to :start-val="0" :end-val="config.articleCount" :duration="2000" class="card-panel-num" />
                    </div>
                </div>
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper">
                        <category-management theme="outline" size="72" fill="#333" :strokeWidth="2" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            分类数量
                        </div>
                        <count-to :start-val="0" :end-val="config.categoryCount" :duration="2000" class="card-panel-num" />
                    </div>
                </div>
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper">
                        <tag theme="outline" size="72" fill="#333" :strokeWidth="2" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            标签数量
                        </div>
                        <count-to :start-val="0" :end-val="config.tagCount" :duration="2000" class="card-panel-num" />
                    </div>
                </div>
                <div class="card-panel">
                    <div class="card-panel-icon-wrapper">
                        <chart-histogram theme="outline" size="72" fill="#333" :strokeWidth="2" />
                    </div>
                    <div class="card-panel-description">
                        <div class="card-panel-text">
                            访问数量
                        </div>
                        <count-to :start-val="0" :end-val="config.viewCount" :duration="2000" class="card-panel-num" />
                    </div>
                </div>
            </div>
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
        </div>
    </section>
</template>


<script setup>
import CountTo from '../../../components/VueCountTo/vue-countTo.vue'
import * as echarts from 'echarts';
import { reactive, onMounted, onUnmounted } from 'vue';
import { useConfigStore } from '../../../store';
import { ListView, CategoryManagement, Tag, ChartHistogram } from '@icon-park/vue-next'
import { list as listLogininfor } from '../../../api/logininfor';
import { list as listCategory } from '../../../api/category';
import { ElMessage } from 'element-plus';

let state = reactive({
    isLogininforLoading: true,
    isChartLoading: true,
    tableData: [],
    categoryDate: [],
    categoryArticleCountData: []
})

let { config } = useConfigStore()

let myChart
let option = {
    color: ["#3398DB"],
    title: {
        show: false
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    xAxis: {
        show: true
    },
    yAxis: {
        type: 'category',
        data: [],
        animationDuration: 300,
        animationDurationUpdate: 300,
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        }
    },
    series: [
        {
            name: '文章数量',
            type: 'bar',
            data: [],
            label: {
                show: true,
                position: 'right',
                valueAnimation: true
            }
        }
    ],
    legend: {
        show: false
    },
    grid: {
        top: '4%',//距上边距
        left: '2%',//距离左边距
        right: '8%',//距离右边距
        bottom: '6%',//距离下边距
        containLabel: true
    }
}

// 分类文章数量
listCategory().then(resp => {
    if (resp.code !== 200) {
        ElMessage.error(resp.msg)
    } else {
        let tempData = resp.data.sort((a, b) => a.articleCount - b.articleCount)
        option.yAxis.data = tempData.map(i => i.name)
        option.series[0].data = tempData.map(i => i.articleCount)
        state.isChartLoading = false
        console.log(option.yAxis.data);
        console.log(option.series[0].data);
        initChart();
    }
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

onMounted(() => {
    // 添加窗口监视
    window.addEventListener('resize', refreshChart)
})

onUnmounted(() => {
    // 卸载监视
    window.removeEventListener('resize', refreshChart)
})

function initChart() {
    // 加载图表
    let chartDom = document.getElementById('charts');
    if (echarts.getInstanceByDom(chartDom)) {
        echarts.getInstanceByDom(chartDom).dispose()
    }
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
}
function refreshChart() {
    if (myChart) {
        myChart.resize()
    }
}
</script>
  
<style scoped>
section {
    display: flex;
    height: calc(100vh - 100px);
    overflow: hidden;
}

.left-panel {
    min-width: 320px;
    height: 100%;
    margin-right: 20px;
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
    height: calc(100vh - 342px);
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

/* 登录记录表 */
.right-panel .login-records {
    background-color: #fff;
    width: 100%;
    height: calc(100% - 132px);
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

    .right-panel .login-records {
        height: calc(100% - 199px);
    }
}
</style>
