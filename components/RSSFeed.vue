<template>
    <div class="max-w-screen-xl mx-auto">
        <div class="items">
            <div class="flex justify-center">
                <h1
                    class="text-5xl font-black text-martinique-500 mt-16 w-4/5 px-4"
                >
                    News
                </h1>
            </div>
            <div class="flex flex-wrap justify-center">
                <div v-for="item in items" class="item w-2/5 px-4 py-6">
                    <p class="text-xl font-bold uppercase truncate">
                        {{ item.title }}
                    </p>
                    <a
                        class="text-base leading-tight font-semibold text-indigo-500 no-underline hover:text-indigo-700 transition duration-300 ease-in-out"
                        :href="item.link"
                        target="_blank"
                        >{{ item.source }}r</a
                    >
                    <p class="text-base h-12 mt-3 overflow-hidden">
                        {{ item.content }}
                    </p>
                    <p class="text-xs font-bold text-gray-600 leading-9">
                        {{ item.pubDate }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let Parser = require("rss-parser");
let parser = new Parser();
export default {
    props: {
        feedURL: {
            type: String,
            required: true,
        },
    },
    mounted() {
        this.fetchFeed();
    },
    data() {
        return {
            items: [],
        };
    },
    methods: {
        async fetchFeed() {
            try {
                let response = await this.$axios.get(
                    "/api/news?city=Peoria&state=IL"
                );
                this.items = response.data.data;
            } catch (e) {
                console.log("Failed to load the news feed");
            }
        },
    },
};
</script>
