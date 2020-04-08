import Vue from "vue";
import { Line } from "vue-chartjs";

Vue.component("c-line", {
    extends: Line,
    props: ["options", "data"],
    mounted() {
        this.renderChart(this.data, this.options);
    },
});
