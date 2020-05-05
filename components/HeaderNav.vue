<template>
	<header class="w-screen px-2 bg-martinique-500 relative z-30">
		<div class="h-32 flex items-center justify-between">
			<nuxt-link to="/">
				<img src="~/assets/img/logo.png" alt="Covid 19 Stats" />
			</nuxt-link>
			<!-- <div class="font-bold uppercase text-sm">
				<nuxt-link to="/" class="mr-6">local info</nuxt-link>
				<nuxt-link to="/volunteer-info" class="mr-6">volunteer info</nuxt-link>
				<nuxt-link to="/info-for-makers" class="mr-6">info for makers</nuxt-link>
				<nuxt-link to="/how-to-stay-sane">how to stay sane</nuxt-link>
			</div> -->
		</div>
	</header>
</template>
<script></script>
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

img {
	width: 445px;
}

header {
	background-image: url('~assets/img/header-bg.png');
	background-repeat: repeat-x;
	background-position: top;
	background-attachment: fixed;
	background-size: 2049px 130px;
	/*mix-blend-mode: multiply;*/
}

</style>
