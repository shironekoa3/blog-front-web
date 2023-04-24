<template>
    <div class="chartsAccess">
        <div id="chartsAccess" v-loading="state.isChartLoading"></div>
        <div class="ctls">
            <div class="ctl">
                <el-radio-group v-model="state.days" size="small" @change="handleChange">
                    <el-radio-button :label="7">7 天</el-radio-button>
                    <el-radio-button :label="15">15 天</el-radio-button>
                    <el-radio-button :label="30">30 天</el-radio-button>
                </el-radio-group>
            </div>
            <div class="ctl demo-switch">
                <span>演示</span>
                <el-switch v-model="state.isDemo" size="small" @change="handleChange" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted, onUnmounted } from 'vue';
import Cookies from 'js-cookie';
import * as echarts from 'echarts';
import { list } from '@/api/access'


let state = reactive({
    isChartLoading: true,
    days: 15,
    isDemo: Cookies.get('chart_is_demo') === 'true'
})

let myChart
let option = {
    color: ["#3398DB"],
    title: {
        // show: false
        text: '站点访问量统计',
        textAlign: 'left',
        left: 'left',
        padding: [20, 0, 0, 20],
    },
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow"
        }
    },
    toolbox: {
        feature: {
            saveAsImage: {
                title: '保存为图片'
            },
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        animationDuration: 300,
        animationDurationUpdate: 300,
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ],
    legend: {
        // show: false
    },
    grid: {
        top: '80',//距上边距
        left: '20',//距离左边距
        right: '20',//距离右边距
        bottom: '20',//距离下边距
        containLabel: true
    }
}



function getRandomData() {
    // 获取当前日期
    const today = new Date();

    // 构造最近 N 天的日期数组
    const days = [];
    for (let i = state.days - 1; i > 0; --i) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        days.push(date);
    }

    // 将日期格式化为字符串
    const formattedDays = days.map(day => {
        const year = day.getFullYear();
        const month = String(day.getMonth() + 1).padStart(2, '0');
        const date = String(day.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    });
    option.xAxis.data = formattedDays

    let randomNumbers = [];
    for (let i = 0; i < state.days; i++) {
        let randomNumber = Math.floor(Math.random() * 291) + 10;
        randomNumbers.push(randomNumber);
    }

    option.series[0].data = randomNumbers
    initChart();
}

function getRealData() {
    list({ days: state.days }).then(resp => {
        if (resp.code !== 200) {
            ElMessage.error(resp.msg)
        } else {
            let dataList = []
            Object.keys(resp.data).forEach(i => {
                dataList.push({
                    date: i,
                    count: resp.data[i]
                })
            })
            dataList.sort((a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))

            option.xAxis.data = dataList.map(i => i.date)
            option.series[0].data = dataList.map(i => i.count)
            initChart();
        }
    })
}

function handleChange() {
    Cookies.set('chart_is_demo', state.isDemo, { expires: 7, path: '/' })
    state.isChartLoading = true
    if (state.isDemo) {
        getRandomData()
    } else {
        getRealData()
    }
}

onMounted(() => {
    // 添加窗口监视
    handleChange();
    window.addEventListener('resize', refreshChart)
})

onUnmounted(() => {
    // 卸载监视
    window.removeEventListener('resize', refreshChart)
})

function initChart() {
    // 加载图表
    let chartDom = document.getElementById('chartsAccess');
    if (echarts.getInstanceByDom(chartDom)) {
        echarts.getInstanceByDom(chartDom).dispose()
    }
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    state.isChartLoading = false
}
function refreshChart() {
    if (myChart) {
        myChart.resize()
    }
}

</script>
<style scoped>
.chartsAccess,
#chartsAccess {
    width: 100%;
    height: 100%;
}

.chartsAccess {
    position: relative;
}

.ctls {
    position: absolute;
    left: 170px;
    top: 12px;
}

.ctl {
    float: left;
}

.demo-switch {
    display: inline-block;
    margin-left: 20px;
    margin-top: 5px;
}

.demo-switch span {
    margin-right: 10px;
}
</style>
  