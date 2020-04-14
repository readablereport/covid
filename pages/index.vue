<template>
    <div>
        <HeaderNav />
        <div class="max-w-screen-xl mx-auto pb-10">
            <h1 class="text-6xl font-black text-martinique-500 mt-16">
                Local COVID-19 info for:
            </h1>
            <form class="w-full max-w-xl">
                <div class="flex items-center border-b-4 border-gray-400 py-2">
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
            <div class="w-full mt-16">
                <no-ssr>
                    <c-line :data="chart.data"></c-line>
                </no-ssr>
            </div>
        </div>
        <div>
            <div id="map-wrap" class="w-screen" style="height: 600px;">
                <l-map
                    @resize="onResizeMap"
                    :zoom="zoom"
                    :center="[40.6936, -89.589]"
                    :options="{ scrollWheelZoom: false }"
                    ref="map"
                >
                    <l-tile-layer
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
                        attribution="Map tiles by <a href='http://stamen.com'>Stamen Design</a>, <a href='http://creativecommons.org/licenses/by/3.0'>CC BY 3.0</a> - Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
                        subdomains="abcd"
                        minZoom="0"
                        maxZoom="20"
                        ext="png"
                    ></l-tile-layer>
                </l-map>
            </div>
            <rss-feed feedURL="" />
        </div>
        <FooterNav />
    </div>
</template>
<script>
// import "leaflet/dist/leaflet.css";
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
            chart: {
                data: {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                    ],
                    datasets: [
                        {
                            label: "My First dataset",
                            backgroundColor: "#FF0000",
                            borderColor: "#FF0000",
                            data: [2, 17, 25, 4, 57, 52, 19],
                            fill: false,
                        },
                        // {
                        //     label: "My Second dataset",
                        //     fill: false,
                        //     backgroundColor: "blue",
                        //     borderColor: "blue",
                        //     data: [
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //         randomScalingFactor(),
                        //     ],
                        // },
                    ],
                },
            },
        };
    },
    methods: {
        onResizeMap() {
            this.map._onResize();
        },
        handleLocationChange({ suggestion, suggestionIndex }) {
            this.places.selected = suggestion;
            this.places.value = `${suggestion.name}, ${suggestion.administrative}`;

            this.markers.forEach((marker, markerIndex) => {
                if (markerIndex === suggestionIndex) {
                    this.markers = [marker];
                    marker.setOpacity(1);
                    this.findBestZoom();
                } else {
                    this.removeMarker(marker);
                }
            });
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
<style></style>
