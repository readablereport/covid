<template>
    <div>
        <HeaderNav />
        <div class="w-full h-screen-math px-16 grid grid-cols-12 gap-4">
            <div class="col-span-8">
                <h1 class="text-6xl font-extrabold text-martinique-500 mt-12">
                    Local COVID-19 info for:
                </h1>
                <form class="w-full" @submit.prevent>
                    <div class="flex items-center border-b-4 border-gray-400 py-2 z-10">
                        <places-input
                            v-model="places.value"
                            :options="places.options"
                            @onChange="handleLocationChange"
                            @onSuggestions="handleOnSuggestions"
                            @onClear="handleOnClear"
                            @onCursorchanged="handleOnCursorchanged"
                        />
                    </div>
                </form>
                <div id="stats" v-if="hasSelectedLocation">
                    <stats :data="stats" />
                </div>
                <div class="news" v-if="hasSelectedLocation">
                    <rss-feed :city="city" :state="state" />
                </div>
            </div>
            <div class="col-span-4">
                <div id="map-wrap" class="w-full h-screen fixed top-0 z-0">
                    <l-map
                        @resize="onResizeMap"
                        :zoom="zoom"
                        :center="[40.6936, -89.589]"
                        :options="{ scrollWheelZoom: false }"
                        ref="map"
                    >
                        <l-tile-layer
                            url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png"
                            attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> - Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
                            subdomains="abcd"
                            minZoom="0"
                            maxZoom="20"
                            ext="png"
                        ></l-tile-layer>
                    </l-map>
                </div>
            </div>
        </div>
        <FooterNav />
    </div>
</template>
<script>
import HeaderNav from "~/components/HeaderNav";
import PlacesInput from "~/components/PlacesInput";
import Stats from "~/components/Stats";
import RSSFeed from "~/components/RSSFeed";
import FooterNav from "~/components/FooterNav";

export default {
    components: {
        PlacesInput,
        Stats,
        "rss-feed": RSSFeed,
        HeaderNav,
        FooterNav,
    },
    mounted() {
        this.$nextTick(() => {
            this.map = this.$refs.map.mapObject;
        });
    },
    async asyncData({ query, $axios }) {
        if (query.city && query.county && query.state) {
            let { data } = await $axios.get(`/api/stats?county=${query.county}&state=${query.state}`);
            let { county, state, country } = data.data;

            return {
                places: {
                    value: `${query.city}, ${query.state}`,
                    selected: {
                        name: query.city,
                        county: query.county,
                        administrative: query.state,
                    },
                },
                stats: {
                    county,
                    state,
                    country,
                },
            };
        }
    },
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
        hasSelectedLocation() {
            return Object.entries(this.places.selected).length > 0;
        },
        city() {
            return this.places.selected.name;
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
                let { data } = await this.$axios.get(`/api/stats?county=${this.county}&state=${this.state}`);
                let { county, state, country } = data.data;
                this.stats.county = county;
                this.stats.state = state;
                this.stats.country = country;

                this.$router.push({
                    query: {
                        city: this.city,
                        county: this.county,
                        state: this.state,
                    },
                });

                // setVal
            } catch (e) {
                console.error(e);
                console.log("Failed to fetch stats");
            }
        },
        clearStats() {
            this.stats.county = {};
            this.stats.state = {};
            this.stats.country = {};
            this.places.selected = {};
            this.$router.push({
                query: null,
            });
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
            this.clearStats();
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
.h-screen-math {
    min-height: calc(100vh - 16rem);
}

.leaflet-top .leaflet-control {
    margin-top: 160px;
}
</style>
