<template>
    <div>
        <HeaderNav />
        <div class="w-full h-screen-math px-16 grid grid-cols-12 gap-4">
            <div class="col-span-12">
                <h1 class="text-6xl font-extrabold text-martinique-500 mt-12" v-if="error.statusCode === 404">
                    Page not found
                </h1>
                <h1 v-else>An error occurred</h1>
                <p>Go to the <nuxt-link to="/">Home page</nuxt-link></p>
            </div>
        </div>
        <FooterNav />
    </div>
</template>
<script>
import HeaderNav from "~/components/HeaderNav";
import FooterNav from "~/components/FooterNav";

export default {
    components: {
        HeaderNav,
        FooterNav,
    },
    props: ["error"],
};
</script>

<style></style>
