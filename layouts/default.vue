<template>
    <main>
        <header-nav />
        <nuxt />
        <footer-nav />
    </main>
</template>

<script>
import HeaderNav from "~/components/HeaderNav";
import FooterNav from "~/components/FooterNav";

export default {
    components: {
        HeaderNav,
        FooterNav,
    },
};
</script>

