<template>
    <div class="mt-20">
        <h2 class="text-center font-semibold text-lg text-martinique-400 uppercase">
            {{ county }} county data over the previous two weeks
        </h2>
        <div class="mt-3">
            <no-ssr>
                <c-line :chart-data="mapData" :options="options"></c-line>
            </no-ssr>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        county: {
            type: String
        },
        timeSeriesData: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.fillData(this.timeSeriesData);
    },
    watch: {
        timeSeriesData(newVal, oldVal) {
            this.fillData(newVal);
        }
    },
    data() {
        return {
            mapData: {},
            options: {
                legend: {
                    position: "bottom",
                    align: "end"
                },
                tooltips: {
                    mode: "index",
                    intersect: false
                },
                hover: {
                    mode: "nearest",
                    intersect: true
                },
                responsive: true,
                maintainAspectRatio: false
            }
        };
    },
    methods: {
        fillData(timeSeriesData) {
            let labels = timeSeriesData.map(item => item.date.replace("-2020", ""));
            let confirmed = timeSeriesData.map(item => item.confirmed);
            let active = timeSeriesData.map(item => item.active);
            let deaths = timeSeriesData.map(item => item.deaths);

            this.mapData = {
                labels: labels,
                datasets: [
                    {
                        label: "Confirmed Cases",
                        backgroundColor: "#898ae61a",
                        borderColor: "#898ae6",
                        data: confirmed,
                        fill: true
                    },
                    // {
                    //     label: "Active Cases",
                    //     backgroundColor: "#ebfef1",
                    //     borderColor: "#104a22",
                    //     data: active,
                    //     fill: true
                    // },
                    {
                        label: "Deaths",
                        backgroundColor: "#fc0a634d",
                        borderColor: "#fc0a63",
                        data: deaths,
                        fill: true
                    }
                ]
            };
        }
    }
};
</script>
