<template>
    <div class="mt-8 mr-10">
        <no-ssr>
            <c-line :chart-data="mapData" :options="options"></c-line>
        </no-ssr>
    </div>
</template>
<script>
export default {
    props: {
        timeSeriesData: {
            type: Array,
            required: true,
        },
    },
    mounted() {
        this.fillData(this.timeSeriesData);
    },
    watch: {
        timeSeriesData(newVal, oldVal) {
            this.fillData(newVal);
        },
    },
    data() {
        return {
            mapData: {},
            options: {
                title: {
                    display: true,
                    position: 'top',
                    text: 'Custom Chart Title'
                },
                legend: {
                    position: 'bottom',
                    align: 'end',
                },
                responsive: true,
                maintainAspectRatio: false,
            },
        };
    },
    methods: {
        fillData(timeSeriesData) {
            let labels = timeSeriesData.map((item) => item.date.replace("-2020", ""));
            let confirmed = timeSeriesData.map((item) => item.confirmed);
            let deaths = timeSeriesData.map((item) => item.deaths);

            this.mapData = {
                labels: labels,
                datasets: [{
                        label: "Confirmed",
                        backgroundColor: "#898ae61a",
                        borderColor: "#898ae6",
                        data: confirmed,
                        fill: true,
                    },
                    {
                        label: "Deaths",
                        backgroundColor: "#fc0a634d",
                        borderColor: "#fc0a63",
                        data: deaths,
                        fill: true,
                    },
                ],
            };
        },
    },
};

</script>
