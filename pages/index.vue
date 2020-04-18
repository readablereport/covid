<template>
	<div>
		<HeaderNav />
		<div class="w-full bg-graph pt-12 relative z-10">
			<div class="max-w-screen-xl mx-auto px-16">
				<h1 class="text-6xl font-bold text-martinique-500">
					Local COVID-19 info for:
				</h1>
				<form class="w-full max-w-2xl">
					<div class="flex items-center border-b-4 border-gray-400 py-2 z-10">
						<places-input v-model="places.value" :options="places.options" @onChange="handleLocationChange" @onSuggestions="handleOnSuggestions" @onClear="handleOnClear" @onCursorchanged="handleOnCursorchanged" />
					</div>
				</form>
				<div class="w-full max-w-2xl">
					<div id="stats" class="flex items-start justify-start mt-8 ml-5">
						<!-- <div>
						<h2 class="text-martinique-500 text-xl font-extrabold uppercase">Country</h2>
						<p class="text-sm text-gray-700 font-bold">{{ this.stats.country.label }}</p>
						<p class="text-sm text-gray-700 font-bold">Confirmed: {{ this.stats.country.confirmed }}</p>
						<p class="text-sm text-gray-700 font-bold">Recovered: {{ this.stats.country.recovered }}</p>
						<p class="text-sm text-gray-700 font-bold">Deaths: {{ this.stats.country.deaths }}</p>
					</div> -->
						<div class="leading-loose">
							<!-- <h2 class="text-gray-700 text-2xl font-bold">State</h2> -->
							<h2 class="text-gray-800 text-xl font-bold capitalize">{{ this.stats.state.label }} State</h2>
							<p class="text-sm text-gray-700 font-bold">Confirmed: <span class="text-sm text-gray-600 font-base">{{ this.stats.state.confirmed }}</span></p>
							<p class="text-sm text-gray-700 font-bold">Recovered: <span class="text-sm text-gray-600 font-base">{{ this.stats.state.recovered }}</span></p>
							<p class="text-sm text-gray-700 font-bold">Deaths: <span class="text-sm text-gray-600 font-base">{{ this.stats.state.deaths }}</span></p>
							<h2 class="text-gray-800 text-xl font-bold capitalize mt-6">{{ this.stats.county.label }} County</h2>
							<!-- <p class="text-sm text-gray-700 font-bold"><span class="text-sm text-gray-600 font-base">{{ this.stats.county.label }}</span></p> -->
							<p class="text-sm text-gray-700 font-bold">Active: <span class="text-sm text-gray-600 font-base">{{ this.stats.county.active }}</span></p>
							<p class="text-sm text-gray-700 font-bold">Confirmed: <span class="text-sm text-gray-600 font-base">{{ this.stats.county.confirmed }}</span></p>
							<p class="text-sm text-gray-700 font-bold">Recovered: <span class="text-sm text-gray-600 font-base">{{ this.stats.county.recovered }}</span></p>
							<p class="text-sm text-gray-700 font-bold">Deaths: <span class="text-sm text-gray-600 font-base">{{ this.stats.county.deaths }}</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<rss-feed :city="city" :state="state" />
		<FooterNav />
		<div id="map-wrap" class="w-screen h-screen mt-32 absolute top-0 z-0 opacity-25">
			<l-map @resize="onResizeMap" :zoom="zoom" :center="[40.6936, -89.589]" :options="{ scrollWheelZoom: false }" ref="map">
				<l-tile-layer url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png" attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> - Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors" subdomains="abcd" minZoom="0" maxZoom="20" ext="png"></l-tile-layer>
			</l-map>
		</div>
	</div>
</template>
<script>
import HeaderNav from "~/components/HeaderNav";
import FooterNav from "~/components/FooterNav";
import PlacesInput from "~/components/PlacesInput";
import RSSFeed from "~/components/RSSFeed";

export default {
	components: {
		PlacesInput,
		"rss-feed": RSSFeed,
		HeaderNav,
		FooterNav,
	},
	mounted() {
		this.$nextTick(() => {
			this.map = this.$refs.map.mapObject;
		});
	},
	// async asyncData({$axios}) {
	// },
	data() {
		return {
			map: null,
			zoom: 13,
			markers: [],
			// https://community.algolia.com/places/documentation.html#options
			places: {
				options: {
					appId: process.env.PLACES_APP_ID,
					apiKey: process.env.PLACES_API_KEY,
					type: "city",
					countries: ["US"],
				},
				value: null,
				selected: {},
			},
			stats: {
				county: {},
				state: {},
				country: {},
			},
		};
	},
	computed: {
		city() {
			return this.places.selected.city;
		},
		county() {
			if (this.places.selected.county) {
				return this.places.selected.county.replace("County", "").trim();
			}
			return "";
		},
		state() {
			return this.places.selected.administrative;
		},
	},
	methods: {
		async fetchStats() {
			try {
				console.log(
					"fetching stats at: " +
					`/api/stats?county=${this.county}&state=${this.state}`
				);
				let { data } = await this.$axios.get(
					`/api/stats?county=${this.county}&state=${this.state}`
				);
				let { county, state, country } = data.data;
				this.stats.county = county;
				this.stats.state = state;
				this.stats.country = country;
			} catch (e) {
				console.log("Failed to fetch stats");
			}
		},
		onResizeMap() {
			this.map._onResize();
		},
		handleLocationChange({ suggestion, suggestionIndex }) {
			this.places.selected = suggestion;

			this.markers.forEach((marker, markerIndex) => {
				if (markerIndex === suggestionIndex) {
					this.markers = [marker];
					marker.setOpacity(1);
					this.findBestZoom();
				} else {
					this.removeMarker(marker);
				}
			});

			this.fetchStats();
		},
		handleOnSuggestions({ suggestions }) {
			this.markers.forEach(this.removeMarker);
			this.markers = [];

			if (suggestions.length === 0) {
				this.selectDefaultLocation();
				return;
			}

			suggestions.forEach(this.addMarker);
			this.findBestZoom();
		},

		handleOnClear() {
			this.selectDefaultLocation();
			this.markers.forEach(this.removeMarker);
		},

		handleOnCursorchanged({ suggestionIndex }) {
			this.markers.forEach((marker, markerIndex) => {
				if (markerIndex === suggestionIndex) {
					marker.setOpacity(1);
					marker.setZIndexOffset(1000);
				} else {
					marker.setZIndexOffset(0);
					marker.setOpacity(0.5);
				}
			});
		},

		selectDefaultLocation() {
			this.map.setView(new L.LatLng(40.6936, -89.589), 13);
		},

		addMarker(suggestion) {
			var marker = L.marker(suggestion.latlng, { opacity: 0.4 });
			marker.addTo(this.map);
			this.markers.push(marker);
		},

		removeMarker(marker) {
			this.map.removeLayer(marker);
		},

		findBestZoom() {
			var featureGroup = L.featureGroup(this.markers);
			this.map.fitBounds(featureGroup.getBounds().pad(0.5), {
				animate: false,
				maxZoom: 13,
			});
		},
	},
};

</script>
<style>
/*@tailwind utilities;

#stats h2 {
	@apply text-martinique-500 text-xl font-extrabold uppercase;
}

#stats p {
	@apply text-sm text-gray-700 font-bold;
}*/

.bg-graph {
	background: rgb(255, 255, 255);
	background: linear-gradient(180deg, rgba(255, 255, 255, 1) 25%, rgba(255, 255, 255, 0) 100%);
}

</style>
