<template>
    <div class="container">
        <div>
            <div id="map-wrap" style="width: 100vw; height: 80vh;">
                <l-map
                    :zoom="13"
                    :center="[40.6936, -89.589]"
                    :options="{ scrollWheelZoom: false }"
                    ref="map"
                >
                    <l-tile-layer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="Map data © <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors"
                    ></l-tile-layer>
                </l-map>
            </div>
            <div style="width: 900px; padding-left: 200px;">
                <input id="places-input" />
            </div>
        </div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import * as places from "places.js";

export default {
    components: {},
    mounted() {
        this.$nextTick(() => {
            this.init();
        });
    },
    data() {
        return {
            map: null,
            markers: [],
            placesAutocomplete: null
        };
    },
    methods: {
        init() {
            this.map = this.$refs.map.mapObject;

            this.placesAutocomplete = places({
                appId: "plQP5A45PM0V",
                apiKey: "cd3cf9fdf488492b1127761c90b683f1",
                container: this.$el.querySelector("#places-input"),
                templates: {
                    value: suggestion => {
                        // console.log(JSON.stringify(suggestion));
                        // return `${suggestion.name}, ${suggestion.administrative}`;
                        return suggestion.query;
                    }
                }
            }).configure({
                type: "city",
                aroundLatLngViaIP: false
            });

            this.placesAutocomplete.on("suggestions", this.handleOnSuggestions);
            this.placesAutocomplete.on(
                "cursorchanged",
                this.handleOnCursorchanged
            );
            this.placesAutocomplete.on("change", this.handleOnChange);
            this.placesAutocomplete.on("clear", this.handleOnClear);
        },
        handleOnSuggestions(e) {
            this.markers.forEach(this.removeMarker);
            this.markers = [];

            if (e.suggestions.length === 0) {
                this.map.setView(new L.LatLng(0, 0), 1);
                return;
            }

            e.suggestions.forEach(this.addMarker);
            this.findBestZoom();
        },

        handleOnChange(e) {
            console.log("selected: ");
            console.dir(e.suggestion);
            this.markers.forEach((marker, markerIndex) => {
                if (markerIndex === e.suggestionIndex) {
                    this.markers = [marker];
                    marker.setOpacity(1);
                    this.findBestZoom();
                } else {
                    this.removeMarker(marker);
                }
            });
        },

        handleOnClear() {
            this.map.setView(new L.LatLng(0, 0), 1);
            this.markers.forEach(this.removeMarker);
        },

        handleOnCursorchanged(e) {
            this.markers.forEach((marker, markerIndex) => {
                if (markerIndex === e.suggestionIndex) {
                    marker.setOpacity(1);
                    marker.setZIndexOffset(1000);
                } else {
                    marker.setZIndexOffset(0);
                    marker.setOpacity(0.5);
                }
            });
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
                animate: false
            });
        }
    }
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-bottom: 1000px;
}

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system,
        BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
        sans-serif;
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}
</style>
