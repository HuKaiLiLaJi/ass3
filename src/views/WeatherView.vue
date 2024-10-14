<template>
    <div class="container">
        <div class="row">
            <h1 class="text-center">WEATHER APP</h1>
            <form class="row row-cols-lg-auto align-items-center justify-content-center" action="#"
                style="margin-bottom: 20px;">
                <div class="col-2">
                    City Name
                </div>
                <div class="col-10">
                    <input type="text" class="form-control" id="inlineFormInputGroupUsername" v-model="city"
                        placeholder="Enter City Name">
                </div>
                <div class="col-12">
                    <button type="button" class="btn btn-primary" @click="searchByCity">Search</button>
                </div>
            </form>
        </div>
    </div>
    <!--The <main> tag in HTML is used to specify the main content of a document 
      More info about main, check https://www.w3schools.com/tags/tag_main.asp-->
    <main class="text-center">
        <!--If there are no data returned, then skip rendering the information-->
        <div v-if="weatherData">
            <!--Display the weather data attribute returned from API
          Example of API data: https://openweathermap.org/current-->
            <h2>
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
                <img :src="iconUrl" alt="Weather Icon" />
                <p>{{ temperature }} °C</p>
            </div>
            <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
            <span>{{ weatherData.weather[0].description }}</span>
        </div>
    </main>
</template>
<script>
// The info section in 10.1.1 provided detailed information about this package 
import axios from "axios";

const apikey = "7c500bc13b4c633eda39bf7ecaa21455";

export default {
    name: "App",
    data() {
        return {
            city: "",
            weatherData: null,
            hourlyForecast: [],
            dailyForecast: [],
        };
    },
    computed: {
        temperature() {
            return this.weatherData
                ? Math.floor(this.weatherData.main.temp - 273)
                : null;
        },
        iconUrl() {
            return this.weatherData
                ? `https://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
                : null;
        },
    },
    mounted() {
        this.fetchCurrentLocationWeather();
    },
    methods: {
        async fetchCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
                    await this.fetchWeatherData(url);
                });
            }
        },
        async fetchWeatherData(url) {
            try {
                const response = await axios.get(url);
                this.weatherData = response.data;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        async searchByCity() {
            const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: this.city,
                    appid: apikey,
                },
            });
            this.weatherData = response.data;
        },
    },
};
</script>