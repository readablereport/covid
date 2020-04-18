<template>
	<nav class="w-100 bg-martinique-500">
		<div class="max-w-screen-xl mx-auto h-32 flex items-center justify-between overflow-hidden">
			<img src="~/assets/img/logo.svg" class="self-center" alt="">
			<div class="font-bold uppercase text-sm pr-16">
				<nuxt-link to="/" class="mr-6">local info</nuxt-link>
				<nuxt-link to="/volunteer-info" class="mr-6">volunteer info</nuxt-link>
				<nuxt-link to="/info-for-makers" class="mr-6">info for makers</nuxt-link>
				<nuxt-link to="/how-to-stay-sane">how to stay sane</nuxt-link>
			</div>
		</div>
	</nav>
</template>

<script>
</script>

<style scoped lang="css">
@tailwind utilities;

a:link,
a:visited {
	@apply transition duration-300 text-melrose-500 no-underline;
}

a:hover {
	@apply text-melrose-200;
}

a.nuxt-link-active {
	@apply cursor-default text-melrose-200;
}
</style>