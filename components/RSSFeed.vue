<template>
    <div class="pb-16">
        <div class="items">
            <h1 class="text-6xl font-extrabold text-martinique-500 mt-16">
                News
            </h1>
            <div class="flex flex-wrap">
                <div v-for="item in items" class="item w-full lg:w-1/2 pr-0 lg:pr-10 py-4">
                    <a
                        class="text-xs uppercase font-bold text-indigo-500 no-underline hover:text-indigo-700 transition duration-300 ease-in-out"
                        :href="item.link"
                        target="_blank"
                        >{{ item.source }}</a
                    >
                    <p class="text-xs font-bold text-gray-600">
                        {{ formatDate(item.isoDate) }}
                    </p>
                    <p class="text-sm text-gray-700 h-14 mt-1">{{ item.title }}...</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Parser from "rss-parser";
let parser = new Parser();
import spacetime from "spacetime";
export default {
    props: {
        city: {
            type: String,
            // required: true,
        },
        state: {
            type: String,
            // required: true,
        },
    },
    mounted() {
        this.fetchFeed();
    },
    watch: {
        city(newVal, oldVal) {
            this.fetchFeed();
        },
        state(newVal, oldVal) {
            this.fetchFeed();
        },
    },

    data() {
        let tz = spacetime.now().timezone().name;
        return {
            source: "google",
            daysToFetch: 7,
            tz: tz,
            items: [],
        };
    },
    methods: {
        formatDate(d) {
            return spacetime(d, this.tz).format("nice-day");
        },
        async fetchFeed() {
            try {
                if (this.city && this.state) {
                    let response = await this.$axios.get(
                        `/news?city=${this.city}&state=${this.state}&source=${this.source}&daysAgo=${this.daysToFetch}`
                    );
                    this.items = response.data.data;
                }
            } catch (e) {
                console.log("Failed to load the news feed");
            }
        },
    },
};
</script>
