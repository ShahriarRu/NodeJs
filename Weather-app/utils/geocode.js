const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic2hhaHJpYXJhbGlmIiwiYSI6ImNrcW5rem8ydjBia2UydXM1czRra2ozNHIifQ.SNQUTwf_Hbbx2d_Lo5qqLw&limit=1";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location. Please search another", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
