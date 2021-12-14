<template>
    <el-card>
        <div>
            <h2>Disk</h2>
        </div>
        <div class="row justify-space-around">
            <div>
                <canvas id="disk-chart-01" style="width: 250px; height: 300px"></canvas>
            </div>
            <div>
                <canvas id="disk-chart-02" style="width: 250px; height: 300px"></canvas>
            </div>
        </div>
    </el-card>
</template>

<script>
import _ from "lodash";
import Chart from "chart.js/auto";

export default {
    name: "diskspace-chart",
    props: {
        chartData: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        chartIds: [
            'disk-chart-01', 'disk-chart-02'
        ],
        charts: [],
        datasets: [],

        option: {
            type: 'doughnut',
            data: {
                labels: ['사용공간', '여유공간'],
                datasets: null
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        }
    }),
    created() {
        const grouping = _.groupBy(this.chartData, item => item.serverCode);
        const keys = _.keys(grouping);

        this.datasets = _.map(keys, key => {
            return _.map(grouping[key], group => {
                return {
                    label: group.path,
                    data: [(100 - group.usedRatio), group.usedRatio],
                    backgroundColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)']
                }
            })
        });
    },
    mounted() {
        for (let i = 0; i < this.datasets.length; i++) {
            const el = document.getElementById(this.chartIds[i]);

            let option = _.cloneDeep(this.option);
            option.data.datasets = this.datasets[i];

            this.charts.push(
                new Chart(el, option)
            );
        }
    }
}
</script>

<style scoped>

</style>
