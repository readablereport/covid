<template>
    <div id="map-wrap">
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
</template>

<script>
import "leaflet/dist/leaflet.css";

export default {
    data() {
        return {
            map: null
        };
    }
};
</script>
