<template>
	<footer class="w-100 px-10 bg-martinique-500 relative z-10">
		<div class="h-32 flex items-center justify-between">
			<a href="https://readable.report/">
				<p class="text-xs font-bold leading-loose text-melrose-300">powered by</p>
				<img class="h-16" src="~assets/img/readable-report-icon-light.svg" alt="">
			</a>
			<p class="text-xs text-white font-bold">
				DATA SOURCES: <a href="https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data" target="_blank" class="text-melrose-300 underline hover:no-underline transition ease-in-out duration-700">Wikipedia</a> | <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" class="text-melrose-300 underline hover:no-underline transition ease-in-out duration-700">Johns Hopkins University</a> | <nuxt-link to="/about-this-data" class="text-melrose-300 underline hover:no-underline transition ease-in-out duration-700">About this data</nuxt-link>
			</p>
		</div>
	</footer>
</template>

<script>
</script>

<style scoped lang="css">
footer {
	background-image: url('~assets/img/footer-bg.svg');
	background-repeat: repeat-x;
	box-shadow: inset 0 30px 60px rgba(30, 30, 50, 0.5);
	background-position: bottom;
	background-attachment: fixed;
}
</style>