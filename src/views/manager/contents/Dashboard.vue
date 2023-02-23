<template>
    <div class="card-panels">
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    文章数量
                </div>
                <count-to :start-val="0" :end-val="30" :duration="2000" class="card-panel-num" />
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    分类数量
                </div>
                <count-to :start-val="0" :end-val="5" :duration="2000" class="card-panel-num" />
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    标签数量
                </div>
                <count-to :start-val="0" :end-val="20" :duration="2000" class="card-panel-num" />
            </div>
        </div>
        <div class="card-panel">
            <div class="card-panel-icon-wrapper">
                <svg-icon icon-class="shopping" class-name="card-panel-icon" />
            </div>
            <div class="card-panel-description">
                <div class="card-panel-text">
                    访问数量
                </div>
                <count-to :start-val="0" :end-val="9999" :duration="2000" class="card-panel-num" />
            </div>
        </div>
    </div>
    <div id="draw">
    </div>
</template>
  
<script>
import CountTo from '../../../components/VueCountTo/vue-countTo.vue'
import * as echarts from 'echarts';
import { ref, onMounted, onUnmounted } from 'vue';

export default {
    name: "dashboard",
    components: {
        CountTo
    },
    setup() {
        let myChart
        function initChart() {
            // 加载图表
            let chartDom = document.getElementById('draw');
            myChart = echarts.init(chartDom);
            let option;

            option = {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'bar',
                        showBackground: true,
                        backgroundStyle: {
                            color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };
            option && myChart.setOption(option);
        }
        function refreshChart() {
            if (myChart) {
                myChart.resize()
            }
        }


        onMounted(() => {
            initChart();

            // 添加窗口监视
            window.addEventListener('resize', refreshChart)
        })

        onUnmounted(() => {
            // 卸载监视
            window.removeEventListener('resize', refreshChart)
        })


        return {

        }
    }
};
</script>

<style scoped>
.card-panels {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}


.card-panel {
    width: 49%;
    margin-bottom: 20px;
    background-color: white;
}

.card-panel-icon-wrapper {
    width: 100px;
    height: 100px;
    margin: 12px 0;
    margin-left: 12px;

    float: left;
    background-color: rgba(0, 0, 0, 0.2);
}

.card-panel-description {
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0;
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

@media only screen and (max-width: 768px) {
    .card-panel {
        width: 100%;
    }
}

@media only screen and (min-width: 1200px) {
    .card-panel {
        width: 24%;
    }
}

#draw {
    width: 100%;
    height: 400px;
    background-color: white;
}
</style>
