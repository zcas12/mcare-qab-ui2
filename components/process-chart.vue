<template>
    <el-card>
<!--        <div class="block" style="margin-bottom: 10px;">
            <span class="demonstration"></span>
            <el-date-picker
                v-model="value1"
                type="daterange"
                start-placeholder="시작일"
                end-placeholder="종료일">
            </el-date-picker>
        </div>
        <el-button type="primary" size="mini">하루</el-button>
        <el-button type="primary" size="mini">일주일</el-button>
        <el-button type="primary" size="mini">한달</el-button>-->
        <div>
            <h2>CPU</h2>
        </div>
        <div>
            <canvas ref="chart" style="width: 100%; height: 300px;"></canvas>
        </div>
    </el-card>
</template>

<script>
import Chart from 'chart.js/auto';
import _ from 'lodash';

export default {
    name: "process-chart",
    props: {
        chartData: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        chart: null,
        value1:'',
        option: {
            type: 'line',
            options: {
/*                animation: {
                    duration: 0
                },*/
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
    }),
    created() {
        const backgroundColors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
        const grouping = _.groupBy(this.chartData, resources => resources.serverCode);
        const keys = _.keys(grouping);
        const labels = _.uniq(_.map(this.chartData, systemResource => systemResource.executeDate));
        console.log(labels);

        this.option = {
            ...this.option,
            data: {
                labels: labels,
                datasets: _.map(keys, (key, index) => {
                    return {
                        label: `QAB - ${key}`,
                        data: _.map(grouping[key], resource => resource.usingProcessorSize),
                        backgroundColor: [
                            backgroundColors[index]
                        ],
                    }
                })
            }
        };
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart, this.option);
    }
}
</script>
