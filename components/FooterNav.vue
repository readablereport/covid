<template>
	<footer class="w-screen lg:w-2/3 px-5 md:px-10 bg-martinique-500 relative z-10">
		<div class="h-32 flex flex-wrap pt-3 md:pt-0 md:flex-no-wrap md:items-center md:justify-between">
			<div class="w-1/4">
				<a href="https://readable.report/">
					<span class="text-xs font-bold leading-loose text-melrose-100">powered by</span>
					<img class="h-16" src="~assets/img/readable-report-icon-light.svg" alt="">
				</a>
			</div>
			<div class="w-3/4 flex justify-end items-start">
				<div class="text-xs text-white font-bold flex flex-wrap">
					<div class="flex flex-wrap">
						<div class="w-full mt-1 md:mt-0 text-right md:text-left">
							<a class="leading-loose text-melrose-100">data sources</a>
						</div>
						<div class="w-full text-right md:text-left">
							<a href="https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data" target="_blank" class="transition ease-in-out duration-700 text-melrose-300 no-underline px-2 py-1 rounded-l bg-martinique-500 hover:bg-melrose-800">
								Wikipedia
							</a>
							<a href="https://github.com/CSSEGISandData/COVID-19" target="_blank" class="transition ease-in-out duration-700 text-melrose-300 no-underline px-2 py-1 rounded-r bg-martinique-500 hover:bg-melrose-800">
								Johns Hopkins CSSE
							</a>
						</div>
					</div>
					<div class="flex flex-wrap">
						<div class="w-full mt-2 md:mt-0 text-right md:text-left">
							<a class="leading-loose text-melrose-100">about</a>
						</div>
						<div class="w-full text-right md:text-left">
							<nuxt-link to="/about-this-data" class="transition ease-in-out duration-700 text-melrose-300 no-underline px-2 py-1 rounded-l bg-martinique-500 hover:bg-melrose-800">
								The data
							</nuxt-link>
							<a href="/downloads/COVID19-local-tracker-media.zip" class="transition ease-in-out duration-700 text-melrose-300 no-underline px-2 py-1 rounded-l bg-martinique-500 hover:bg-melrose-800">
								Media kit
							</a>
							<nuxt-link to="/privacy" class="transition ease-in-out duration-700 text-melrose-300 no-underline px-2 py-1 rounded-r bg-martinique-500 hover:bg-melrose-800">
								Privacy Policy
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>
<script>
</script>
<style scoped lang="css">
</style>
