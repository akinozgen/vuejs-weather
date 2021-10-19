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
}