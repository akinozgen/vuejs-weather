<template>
 <main>
   <div class="search-box">
     <input type="text" class="search-bar" placeholder="Ara..." v-model="query" @keypress="fetchWeather" />
   </div>

   <div class="weather-wrap">
     <div class="location-box">
       <div class="location" v-text="weather.locationName"></div>
       <div class="date" v-text="weather.date"></div>
     </div>
   </div>

   <div class="weather-box">
     <div class="temp" v-text="weather.temp"></div>
     <div class="weather" v-text="weather.status"></div>
   </div>
 </main>
</template>

<script>
import moment from 'moment';
import 'moment/dist/locale/tr';
moment.locale('tr');

export default {
  name: 'App',
  data() {
    return {
      api_key: '25918dbf0f39d4568328272961e4f151',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {
        locationName: 'Tekirdağ, TR',
        date: 'Pazartesi, 6 Ağustos 2020',
        temp: '12°C',
        status: 'Yağmurlu'
      },
      isWarm: false
    };
  },
  methods: {
    fetchWeather(e) {
      if (e.key !== 'Enter') return;

      fetch(`${this.url_base}weather?q=${this.query}&units=metric&appid=${this.api_key}&lang=TR`)
      .then(res => res.json())
      .then(res => {
        this.weather.locationName = res.name;
        // Pazartesi, 6 Ağustos 2020
        this.weather.date = moment().format('dddd, D MMMM YYYY');
        this.weather.temp = `${parseInt(res.main.temp)}°C`;
        this.weather.status = res.weather[0].description;

        if (res.main.temp >= 25) {
          return this.isWarm = true
        }
        this.isWarm = false;
      })
    }
  },
  watch: {
    isWarm() {
      const warmImage = require('./assets/warm.jpg');
      const coldImage = require('./assets/cold.jpg');
      document.querySelector('#app').style.backgroundImage = this.isWarm ? "url('"+warmImage+"')" :
          'url('+coldImage  +')';
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  background-image: url("./assets/cold.jpg");
  background-size: cover;
  background-position: bottom;
  transition: .4s;
}

main {
  min-height: 100vh;
  padding: 2rem;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, .25),rgba(0, 0, 0, .75));
}

.search-box {
  width: 100%;
  margin-bottom: 2.2rem;;
}

.search-box .search-bar {
  text-align: center;
  display: block;
  width: 100%;
  padding: .8rem;
  font-size: 1rem;
  color: #2f2f31;

  appearance: none;
  border: none;
  outline: none;
  background: rgba(255, 255, 255, 0.5) none;
  border-radius: 100px;
  box-shadow:
      0 1.9px 3.9px rgba(0, 0, 0, 0.028),
      0 4.8px 9.9px rgba(0, 0, 0, 0.04),
      0 9.7px 20.2px rgba(0, 0, 0, 0.05),
      0 20.1px 41.6px rgba(0, 0, 0, 0.062),
      0 55px 114px rgba(0, 0, 0, 0.09);
  transition: .4s;
}

.search-box .search-bar:focus {
  background: white none;
  border-radius: 0;
  width: 100vw;
  font-size: 1.4rem;
  padding: 1rem;
  margin: -2rem -2rem 3.3rem -2rem;
  text-align: left;
}

.location-box .location {
  color: white;
  font-size: 2rem;
  font-weight: 500;
  text-shadow: 1px 3px rgba(0, 0, 0, .25);
  text-align: center;
}

.location-box .date {
  color: white;
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 300;
  text-shadow: 1px 3px rgba(0, 0, 0, .25);
  text-align: center;
}

.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: .8rem 1rem;
  color: white;
  font-size: 5rem;
  font-weight: bold;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
  background-color: rgba(255, 255, 255, .25);
  border-radius: 8px;
  box-shadow:
      0 2.8px 2.2px rgba(0, 0, 0, 0.052),
      0 6.7px 5.3px rgba(0, 0, 0, 0.069),
      0 12.5px 10px rgba(0, 0, 0, 0.081),
      0 22.3px 17.9px rgba(0, 0, 0, 0.094),
      0 41.8px 33.4px rgba(0, 0, 0, 0.117),
      0 100px 80px rgba(0, 0, 0, 0.16)
  ;
  margin: 2rem 0;
}

.weather-box .weather {
  text-transform: capitalize;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  font-style: italic;
  text-shadow: 3px 6px rgba(0, 0, 0, .25);
}

</style>
