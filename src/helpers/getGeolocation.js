export default function () {
  if (!navigator.geolocation) return;

  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition((success) => {
      res(success);
    }, (error) => {
      rej(error);
    }, {
      enableHighAccuracy: true,
      timeout: 10000
    });
  });

  /*
    Demo:

    getCurrentLocation()
        .then(geoLocationObject => {
          
          const { latitude, longitude } = geoLocationObject.coords;
          this.geoLocation.lat = latitude; // enlem
          this.geoLocation.lng = longitude; // boylam
          this.fetchWeather({}, true);
        })
        .catch(err => {
          console.log(err);
        })
  */
}