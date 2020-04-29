<template>
    <main class="crr--h-screen-minus-header flex">
        <section class="w-full md:w-2/3 mx-auto px-8 lg:px-16">
            <h1 class="text-4xl font-extrabold text-martinique-500 mt-8 md:mt-16">
                Local COVID-19 statistics data
            </h1>
            <h2 class="text-2xl font-extrabold text-melrose-700">
                About this data
            </h2>
            <h3 class="text-xl font-bold text-gray-700 mt-8">
                It changes rapidly
            </h3>
            <p class="text-base text-gray-700">
                This data changes rapidly and might not reflect all cases as the reporting time and frequency vary.
            </p>
            <h3 class="text-xl font-bold text-gray-700 mt-6">
                It comes from Wikipedia and Johns Hopkins CSSE
            </h3>
            <p class="text-base text-gray-700">
                The data comes from
                <a
                    href="https://en.wikipedia.org/wiki/Template:2019%E2%80%9320_coronavirus_pandemic_data"
                    target="_blank"
                    class="underline text-melrose-600 hover:no-underline transition ease-in-out duration-700"
                    >Wikipedia</a
                >
                and
                <a
                    href="https://github.com/CSSEGISandData/COVID-19"
                    target="_blank"
                    class="underline text-melrose-600 hover:no-underline"
                    >Johns Hopkins CSSE</a
                >.
            </p>
            <h3 class="text-xl font-bold text-gray-700 mt-6">
                Why do I get different data from different sources?
            </h3>
            <p class="text-base text-gray-700">
                Reporting varies as there are numerous sources of coronavirus data. Each source may update, gather, or
                aggregate in a different way.
            </p>
            <h3 class="text-xl font-bold text-gray-700 mt-6">
                How can I help?
            </h3>
            <p class="text-base text-gray-700">
                This is an open source project and we would love for you to contribute. You can do so via
                <a
                    href="https://github.com/readablereport/covid"
                    target="_blank"
                    class="underline text-melrose-600 hover:no-underline"
                    >GitHub</a
                >.
            </p>
        </section>
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
<style></style>
