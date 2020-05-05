<template>
    <div class="bg-melrose-500">
        <header-nav />
        <nuxt />
        <footer-nav />
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
};
</script>