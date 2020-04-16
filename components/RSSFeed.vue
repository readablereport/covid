<template>
	<div class="max-w-screen-xl mx-auto pt-6 pb-24">
		<div class="items">
			<div class="flex justify-center">
				<h1 class="text-5xl font-black text-martinique-500 mt-16 w-4/5 px-6">
					News
				</h1>
			</div>
			<div class="flex flex-wrap justify-center">
				<div v-for="item in items" class="item w-2/5 px-6 pt-8">
					<h2 class="text-xl font-bold leading-tight truncate text-gray-800">{{ item.title }}</h2>
					<div class="flex items-center">
						<a class="text-xs uppercase font-bold text-indigo-500 no-underline hover:text-indigo-700 transition duration-300 ease-in-out" :href="item.link" target="_blank">Item Source Placeholder</a>
						<span class="px-1 text-gray-400">&bull;</span>
						<p class="text-xs font-bold text-gray-600">{{ item.pubDate }}</p>
					</div>
					<p class="text-sm text-gray-700 h-14 mt-1 overflow-hidden">{{ item.content }}</p>
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
				CORS_PROXY +
				"https://www.bing.com/news/search?q=peoria+il+covid&format=rss"
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
