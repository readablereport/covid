<template>
    <div class="m-16">
        <no-ssr>
            <c-line :data="data"></c-line>
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
    data() {
        let labels = this.timeSeriesData.map((item) => item.date.replace("-2020", ""));
        let confirmed = this.timeSeriesData.map((item) => item.confirmed);
        let deaths = this.timeSeriesData.map((item) => item.deaths);

        return {
            data: {
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
            },
        };
    },
};
</script>
