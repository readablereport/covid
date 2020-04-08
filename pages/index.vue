<template>
    <div class="container">
        <div>
            <div id="map-wrap" style="width: 100vw; height: 80vh;">
                <l-map
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
            <div style="width: 900px; padding-left: 200px;">
                <places-input
                    v-model="places.value"
                    :options="places.options"
                    @onChange="handleLocationChange"
                    @onSuggestions="handleOnSuggestions"
                    @onClear="handleOnClear"
                    @onCursorchanged="handleOnCursorchanged"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PlacesInput from "~/components/PlacesInput";

export default {
    components: {
        PlacesInput,
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
                    appId: "plQP5A45PM0V",
                    apiKey: "cd3cf9fdf488492b1127761c90b683f1",
                    type: "city",
                    countries: ["US"],
                },
                value: null,
                selected: {},
            },
        };
    },
    methods: {
        handleLocationChange({ suggestion, suggestionIndex }) {
            console.log(
                `place: ${suggestion.name}, ${suggestion.administrative}`
            );
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
        // me
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
/* Sample `apply` at-rules with Tailwind CSS */
.container {
    /*@apply min-h-screen flex justify-center items-center text-center mx-auto;*/
}
</style>
