import Vue from "vue";
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

Vue.component("c-line", {
    extends: Line,
    mixins: [reactiveProp],
    props: ["options"],
    mounted() {
        // this.chartData is created in the mixin.
        // If you want to pass options please create a local options object
        this.renderChart(this.chartData, this.options);
    },
});
