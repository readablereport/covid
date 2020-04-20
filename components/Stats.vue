<template>
    <div class="flex items-start justify-between mt-10 relative z-10">
        <!-- County -->
        <div class="bg-melrose-800 rounded-sm w-1/3 p-8 shadow shadow-md text-center">
            <p
                class="text-xl text-melrose-200 font-extrabold uppercase leading-none pb-6 border-b-2 border-melrose-600"
            >
                {{ this.data.county.label }} County
            </p>
            <div>
                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.county.confirmed) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Confirmed
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.county.recovered) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Recovered
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.county.deaths) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Deaths
                </p>
            </div>
        </div>
        <!-- State -->
        <div class="bg-melrose-800 rounded-sm w-1/3 mx-8 p-8 shadow shadow-md text-center">
            <p
                class="text-xl text-melrose-200 font-extrabold uppercase leading-none pb-6 border-b-2 border-melrose-600"
            >
                {{ this.data.state.label }}
            </p>
            <div>
                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.state.confirmed) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Confirmed
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.state.recovered) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Recovered
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.state.deaths) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Deaths
                </p>
            </div>
        </div>
        <!-- Country -->
        <div class="bg-melrose-800 rounded-sm w-1/3 p-8 shadow shadow-md text-center">
            <p
                class="text-xl text-melrose-200 font-extrabold uppercase leading-none pb-6 border-b-2 border-melrose-600"
            >
                {{ this.data.country.label }}
            </p>
            <div>
                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.country.confirmed) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Confirmed
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.country.recovered) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Recovered
                </p>

                <p class="text-3xl text-melrose-200 font-semibold mt-4">
                    {{ this.clean(this.data.country.deaths) }}
                </p>
                <p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
                    Deaths
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    methods: {
        clean(stat) {
            if (stat === 0) {
                return 0;
            }

            //null / undefined
            if (!stat) {
                return "N/A";
            }

            return stat;
        },
    },
};
</script>
