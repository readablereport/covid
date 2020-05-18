<template>
	<div>
		<header-nav />
		<nuxt />
		<footer-nav />
	</div>
</template>

<script>
// try {
// 	window.dojoRequire(["mojo/signup-forms/Loader"], function(L) {
// 		L.start({
// 			baseUrl: "mc.us18.list-manage.com",
// 			uuid: "3eabef0b4d299942124c00e1f",
// 			lid: "beff440f24",
// 			uniqueMethods: true
// 		});
// 	});
// } catch (e) {
// 	console.log("Mailchimp form blocked");
// }

import HeaderNav from "~/components/HeaderNav";
import FooterNav from "~/components/FooterNav";

export default {
	components: {
		HeaderNav,
		FooterNav
	}
};
</script>
