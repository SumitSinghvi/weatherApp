import { useSelector } from "react-redux";
import { WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";
import { PrevWeatherItems } from "@/slices/prevWeekTempSlice";

interface RootTemp {
    day: string;
    temp: number;
    prevTemp: number;
    icon: string;
  }

export default function useDayAndTemp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast = useSelector((state: any) => state.weather.forecast);
  const prevForecast = useSelector((state : { prevweektemp: { forecast: PrevWeatherItems[] }}) => state.prevweektemp.forecast);
  const description = forecast.map((item: WeatherItems) => item.description);
  
  //regex test for icon descriptions
  const sunRegex = /^(Sunny)$/i;
  const cloudyRegex = /^(Partly Cloudy |Partly cloudy|Cloudy|Overcast|Mist|Fog|Freezing fog)$/i;
  const rainRegex = /^(Patchy rain nearby|Patchy rain possible|Patchy light drizzle|Light drizzle|Freezing drizzle|Heavy freezing drizzle|Patchy light rain|Light rain|Moderate rain at times|Moderate rain|Heavy rain at times|Heavy rain|Light freezing rain|Moderate or heavy freezing rain|Light rain shower|Moderate or heavy rain shower|Torrential rain shower|Patchy light rain with thunder|Moderate or heavy rain with thunder)$/i;
  const snowyRegex = /^(Patchy snow possible|Patchy sleet possible|Patchy freezing drizzle possible|Blowing snow|Blizzard|Patchy light snow|Light snow|Patchy moderate snow|Moderate snow|Patchy heavy snow|Heavy snow|Ice pellets|Light sleet|Moderate or heavy sleet|Light snow showers|Moderate or heavy snow showers|Light showers of ice pellets|Moderate or heavy showers of ice pellets|Patchy light snow with thunder|Moderate or heavy snow with thunder)$/i;
  const sunRainRegex = /^(Thundery outbreaks possible)$/i;
  console.log(description);
  const icon = description.map((item: string) => {
    if (sunRegex.test(item)) {
      return '/Sun.svg';
    } else if (cloudyRegex.test(item)) {
      return '/Clouds.svg';
    } else if (rainRegex.test(item)) {
      return '/Rain.svg';
    } else if (snowyRegex.test(item)) {
      return '/Snow.svg';
    } else if (sunRainRegex.test(item)) {
      return '/Sun-Rain.svg';
    } else {
      return '/sun.svg';
    }
  });

  const weekTempAndDay: RootTemp[] = forecast.map((item: WeatherItems, index: number) => ({
    day: DateToDay(item.dt),
    temp: item.temp,
    prevTemp: prevForecast[index].temp,
    icon: icon[index],
  }));

  if(weekTempAndDay[0].day === 'Invalid Date') {
    return { weekTempAndDay: [{ day: 'Today', temp: 0, prevTemp: 0, icon: 'sun'}] };
  }
  return { weekTempAndDay };
}
