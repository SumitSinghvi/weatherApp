export function getIcons(arr: string[]) {
  //regex test for icon descriptions
  const sunRegex = /^(Sunny)$/i;
  const cloudyRegex =
    /^(Partly Cloudy |Partly cloudy|Cloudy|Overcast|Mist|Fog|Freezing fog)$/i;
  const rainRegex =
    /^(Patchy rain nearby|Patchy rain possible|Patchy light drizzle|Light drizzle|Freezing drizzle|Heavy freezing drizzle|Patchy light rain|Light rain|Moderate rain at times|Moderate rain|Heavy rain at times|Heavy rain|Light freezing rain|Moderate or heavy freezing rain|Light rain shower|Moderate or heavy rain shower|Torrential rain shower|Patchy light rain with thunder|Moderate or heavy rain with thunder)$/i;
  const snowyRegex =
    /^(Patchy snow possible|Patchy sleet possible|Patchy freezing drizzle possible|Blowing snow|Blizzard|Patchy light snow|Light snow|Patchy moderate snow|Moderate snow|Patchy heavy snow|Heavy snow|Ice pellets|Light sleet|Moderate or heavy sleet|Light snow showers|Moderate or heavy snow showers|Light showers of ice pellets|Moderate or heavy showers of ice pellets|Patchy light snow with thunder|Moderate or heavy snow with thunder)$/i;
  const sunRainRegex = /^(Thundery outbreaks possible)$/i;
  console.log();
  const iconList = arr.map((item: string) => {
    if (sunRegex.test(item)) {
      return "/Sun.svg";
    } else if (cloudyRegex.test(item)) {
      return "/Clouds.svg";
    } else if (rainRegex.test(item)) {
      return "/Rain.svg";
    } else if (snowyRegex.test(item)) {
      return "/Snow.svg";
    } else if (sunRainRegex.test(item)) {
      return "/Sun-Rain.svg";
    } else {
      return "/Sun.svg";
    }
  });
  return iconList;
}
