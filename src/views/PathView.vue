<template>
    <div class="container">
        <div class="row col-12">
            <h1 class="text-center">Navigate Between Places</h1>
            <form class="row row-cols-lg align-items-center justify-content-center" action="#"
                style="margin-bottom: 20px;">
                <div class="row col-3">
                    <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">From</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control form-control-lg" v-model="start"
                            placeholder="Start Place" @keyup.enter="getDirections" required>
                    </div>
                </div>
                <div class="row col-3">
                    <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">To</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control form-control-lg" v-model="end" placeholder="End Place"
                            @keyup.enter="getDirections" required>
                    </div>
                </div>
                <div class="row col-4">
                    <label for="colFormLabelLg" class="col-sm-5 col-form-label col-form-label-lg">Travel Mode</label>
                    <div class="col-sm-7">
                        <select v-model="travelMode" class="form-control">
                            <option value="driving">Driving</option>
                            <option value="walking">Walking</option>
                            <option value="cycling">Cycling</option>
                        </select>
                    </div>
                </div>
                <div class="col-2">
                    <button type="button" class="btn btn-success" @click="getDirections">Search</button>
                </div>
            </form>


        </div>
        <div id="map" style="width: 100%; min-height:600px; height: 100%;"></div>
    </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import axios from "axios";

export default {
    data() {
        return {
            map: null,
            start: "", // Starting point
            end: "", // Destination
            travelMode: "driving", // Default travel mode
            mapboxToken: "pk.eyJ1IjoieXVwZW5nbGl1IiwiYSI6ImNtMjF2a2lpNDAwa28ybXEwNzByeHZkdjEifQ.eJuvRXNJcqKUbAFBwu5xJg", // Mapbox Access Token
        };
    },
    mounted() {
        this.initializeMap(); // Initialize the map
    },
    methods: {
        initializeMap() {
            mapboxgl.accessToken = this.mapboxToken;
            this.map = new mapboxgl.Map({
                container: "map", // Map container ID
                style: "mapbox://styles/mapbox/streets-v11", // Map style
                center: [144.9634, -37.8130], // map center
                zoom: 10, // Initial zoom level
            });

            // Add zoom and rotation controls
            this.map.addControl(new mapboxgl.NavigationControl());
        },
        async getCoordinates(place) {
            const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${this.mapboxToken}`;

            try {
                const response = await axios.get(geocodeUrl);
                const coordinates = response.data.features[0].center;
                return coordinates;
            } catch (error) {
                console.error("Error fetching coordinates:", error);
                return null;
            }
        },
        async getDirections() {
            // Check if both start and end points are provided
            if (!this.start || !this.end) return;
            
            // Convert place names to coordinates using Geocoding API
            const startCoordinates = await this.getCoordinates(this.start);
            const endCoordinates = await this.getCoordinates(this.end);
            if (!startCoordinates || !endCoordinates) return;

            // Construct the Directions API URL with travel mode, start and end coordinates
            const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/${this.travelMode}/${startCoordinates};${endCoordinates}?geometries=geojson&access_token=${this.mapboxToken}`;

            try {
                // Send request to the Mapbox Directions API
                const response = await axios.get(directionsUrl);
                const route = response.data.routes[0].geometry;

                // Remove any existing route layer
                if (this.map.getSource('route')) {
                    this.map.removeLayer('route');
                    this.map.removeSource('route');
                }

                // Add the new route to the map
                this.map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: route,
                    },
                });

                this.map.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#3b9ddd',
                        'line-width': 5,
                    },
                });

                // Automatically adjust the map to fit the route
                const bounds = new mapboxgl.LngLatBounds();
                route.coordinates.forEach((coord) => bounds.extend(coord));
                this.map.fitBounds(bounds, { padding: 50 });
            } catch (error) {
                console.error('Error fetching directions:', error);
            }
        },
    },
};
</script>

<style>
/* Optional: Style adjustments */
#map {
    border: 2px solid #ccc;
    border-radius: 10px;
    margin-top: 20px;
}

.controls {
    margin-bottom: 20px;
}

.controls input,
.controls select,
.controls button {
    margin: 5px;
    padding: 10px;
}
</style>