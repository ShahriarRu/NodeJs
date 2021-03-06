const chalk = require("chalk");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const address = process.argv[2];
console.log(address);
if (!address) {
  console.log(chalk.inverse.red("Please provide an lacation"));
} else {
  geoCode(address, (error, data) => {
    if (error) {
      return console.log(error);
    }
    forecast(data.latitude, data.latitude, (error, forecastdata) => {
      if (error) {
        return console.log(chalk.inverse.red(error));
      }
      console.log(chalk.inverse.yellow("Location: " + data.location));
      console.log(
        chalk.inverse.green(
          "Temperature: " + forecastdata.temperature + " dregree celcious"
        )
      );
    });
  });
}
