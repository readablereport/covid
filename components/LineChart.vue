<template>
    <div class="m-16">
        <no-ssr>
            <c-line :chart-data="mapData"></c-line>
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
        };
    },
    methods: {
        fillData(timeSeriesData) {
            let labels = timeSeriesData.map((item) => item.date.replace("-2020", ""));
            let confirmed = timeSeriesData.map((item) => item.confirmed);
            let deaths = timeSeriesData.map((item) => item.deaths);

            this.mapData = {
                labels: labels,
                datasets: [
                    {
                        label: "Confirmed",
                        // backgroundColor: "#ff00ff",
                        borderColor: "#ff00ff",
                        data: confirmed,
                        fill: false,
                    },
                    {
                        label: "Deaths",
                        // backgroundColor: "#2a2b4d",
                        borderColor: "#2a2b4d",
                        data: deaths,
                        fill: false,
                    },
                ],
            };
        },
    },
};
</script>
