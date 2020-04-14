<template>
    <div class="items">
        <div v-for="item in items" class="item">
            <div>{{ item.title }}</div>
            <div>{{ item.content }}</div>
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
        console.log("RSS FEED MOUNTED");
        this.fetchFeed();
    },
    data() {
        return {
            items: [],
        };
    },
    methods: {
        async fetchFeed() {
            const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
            console.log("fetching feed");
            let feed = await parser.parseURL(
                CORS_PROXY + "https://www.reddit.com/.rss"
            );
            console.log(feed.title);
            this.items = feed.items;
            feed.items.forEach((item) => {
                console.log(item.title + ":" + item.link);
            });
        },
    },
};
</script>
