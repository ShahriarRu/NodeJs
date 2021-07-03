const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURIComponent(latitude) +
    "&lon=" +
    encodeURIComponent(longitude) +
    "&appid=57071cd024cd5044346b331bf35255fc&units=metric";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect the forecast service", undefined);
    } else if (response.body.error) {
      callback("Unable to find the forecast for this location", undefined);
    } else {
      callback(undefined, {
        temperature: response.body.main.temp,
      });
    }
  });
};
module.exports = forecast;
