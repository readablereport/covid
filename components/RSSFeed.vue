<template>
	<div class="max-w-screen-lg h-full mx-auto pb-16 relative z-10 h-64">
		<div class="items">
			<h1 class="text-5xl font-black text-martinique-500 mt-16 mb-4 pl-6">
				News
			</h1>
			<div class="flex flex-wrap">
				<div v-for="item in items" class="item w-1/2 px-6 py-6">
					<h2
						class="text-xl font-bold leading-tight truncate text-gray-800"
					>
						{{ item.title }}
					</h2>
					<div class="flex items-center">
						<a
							class="text-xs uppercase font-bold text-indigo-500 no-underline hover:text-indigo-700 transition duration-300 ease-in-out"
							:href="item.link"
							target="_blank"
							>{{ item.source }}</a
						>
						<span class="px-1 text-gray-400">&bull;</span>
						<p class="text-xs font-bold text-gray-600">
							{{ item.pubDate }}
						</p>
					</div>
					<p class="text-sm text-gray-700 h-14 mt-1">
						{{ item.content }}
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
	data() {
		return {
			items: [],
		};
	},
	methods: {
		async fetchFeed() {
			try {
				if (this.city && this.state) {
					let response = await this.$axios.get(
						`/api/news?city=${this.city}&state=${this.state}`
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
