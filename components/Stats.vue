<template>
	<div class="flex flex-wrap md:flex-no-wrap items-start justify-center md:justify-between mt-8">
		<template v-if="isLoading">
			<p>Loading Stats...</p>
		</template>
		<template v-else>
			<!-- County -->
			<div class="crr--card">
				<div class="flex justify-center items-center border-b-2 border-melrose-600 h-16">
					<p class="text-xl text-melrose-200 font-extrabold uppercase leading-none">
						{{ this.stats.county.label }} County
					</p>
				</div>
				<div>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.county.confirmed) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Confirmed
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.county.active) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Active
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.county.deaths) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Deaths
					</p>
				</div>
			</div>
			<!-- State -->
			<div class="crr--card">
				<div class="flex justify-center items-center border-b-2 border-melrose-600 h-16">
					<p class="text-xl text-melrose-200 font-extrabold uppercase leading-none">
						{{ this.stats.state.label }}
					</p>
				</div>
				<div>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.state.confirmed) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Confirmed
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.state.recovered) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Recovered
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.state.deaths) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Deaths
					</p>
				</div>
			</div>
			<!-- Country -->
			<div class="crr--card">
				<div class="flex justify-center items-center border-b-2 border-melrose-600 h-16">
					<p class="text-xl text-melrose-200 font-extrabold uppercase leading-none">
						{{ this.stats.country.label }}
					</p>
				</div>
				<div>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.country.confirmed) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Confirmed
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.country.recovered) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Recovered
					</p>
					<p class="text-3xl text-white font-semibold mt-4">
						{{ this.clean(this.stats.country.deaths) }}
					</p>
					<p class="text-base text-melrose-300 font-extrabold uppercase leading-none">
						Deaths
					</p>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
export default {
	props: {
		stats: {
			type: Object,
			required: true
		}
	},
	computed: {
		isLoading() {
			return this.stats.isLoading;
		}
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
		}
	}
};
</script>
