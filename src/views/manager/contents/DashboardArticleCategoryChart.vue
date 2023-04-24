<template>
    <div class="charts" id="charts" v-loading="state.isChartLoading"></div>
</template>

<script setup>
import { reactive, toRefs, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import { list as listCategory } from '@/api/category';


let state = reactive({
    isChartLoading: true
})

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
        initChart();
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
<style scoped></style>