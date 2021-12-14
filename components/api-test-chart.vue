<template>
    <el-card>
        <div>
            <h2>API Test Results</h2>
        </div>
        <div id="legend-container"></div>
        <div>
            <canvas ref="chart" style="width: 100%; height: 300px"></canvas>
        </div>
    </el-card>
</template>

<script>
import _ from "lodash";
import Chart from "chart.js/auto";
import htmlLegendPlugin from "@/plugins/chartjs";

export default {
    name: "api-test-chart",

    props: {

    },
    data: () => ({
        chart: null,
        options: {
            type: 'line',
            data: [],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: false,
                plugins: {
                    htmlLegend: {
                        container: 'legend-container',
                    },
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',

                        // grid line settings
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                }
            },
            plugins: [htmlLegendPlugin]
        }
    }),
    created() {
        const servers = _.groupBy(this.chartData, i => i.serverCode);
        const serverKeys = _.keys(servers);
        const apis = _.groupBy(this.chartData, i => i.apiId);
        const apiKeys = _.keys(apis);

        const labels = _.uniq(_.map(this.chartData, i => i.executeDate));

        let i = -1;
        this.options.data = {
            labels: labels,
            datasets: _.flatMapDeep(_.map(serverKeys, serverKey => {
                    i++;
                    return _.map(apiKeys, apiKey => {
                        const filtered = _.filter(servers[serverKey], server => server.apiId === parseInt(apiKey));
                        const apiName = filtered[0].apiName;

                        return {
                            label: `QAB-${serverKey}(${apiName})`,
                            data: _.map(filtered, data => data.elapsedTime),
                            borderColor: i % 2 === 0 ? ['rgba(255, 99, 132, 1)'] : ['rgba(54, 162, 235, 1)'],
                            backgroundColor: i % 2 === 0 ? ['rgba(255, 99, 132, 1)'] : ['rgba(54, 162, 235, 1)'],
                            yAxisID: 'y'
                        }
                    })
                })
            )
        };
    },
    mounted() {
        this.chart = new Chart(this.$refs.chart, this.options);
    }
}
</script>

<style scoped>

</style>
