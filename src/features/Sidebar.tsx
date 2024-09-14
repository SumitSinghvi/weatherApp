import Searchbar from "../components/Searchbar";
import { RiCelsiusLine } from "react-icons/ri";
import { CiCloud } from "react-icons/ci";
import { IoReorderFourOutline } from "react-icons/io5";
import { TbTemperatureFahrenheit } from "react-icons/tb";


import { useSelector } from "react-redux";
import { Location, WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";

export default function Sidebar() {
  // const icon = {
  //   'Sunny': './Sun.svg',
  //   'Cloudy': './Cloudy.svg',
  //   'Rainy': './Rainy.svg',
  // }
  const data = useSelector((state: { weather: { forecast: WeatherItems[], location: Location}}) => state.weather);
  const day  = useSelector((state: { dayandtemp: { day: string }}) => state.dayandtemp.day);

  const selectedDayIndex = data.forecast.findIndex((forecastItem) => DateToDay(forecastItem.dt) === day);
  const selectedForecast = selectedDayIndex !== -1 ? data.forecast[selectedDayIndex] : data.forecast[0];
  const tempUnit = useSelector((state: { weather: { tempUnit: string }}) => state.weather.tempUnit);

  //regex test for icon descriptions
  const sunRegex = /^(Sunny)$/i;
  const cloudyRegex = /^(Partly Cloudy |Partly cloudy|Cloudy|Overcast|Mist|Fog|Freezing fog)$/i;
  const rainRegex = /^(Patchy rain nearby|Patchy rain possible|Patchy light drizzle|Light drizzle|Freezing drizzle|Heavy freezing drizzle|Patchy light rain|Light rain|Moderate rain at times|Moderate rain|Heavy rain at times|Heavy rain|Light freezing rain|Moderate or heavy freezing rain|Light rain shower|Moderate or heavy rain shower|Torrential rain shower|Patchy light rain with thunder|Moderate or heavy rain with thunder)$/i;
  const snowyRegex = /^(Patchy snow possible|Patchy sleet possible|Patchy freezing drizzle possible|Blowing snow|Blizzard|Patchy light snow|Light snow|Patchy moderate snow|Moderate snow|Patchy heavy snow|Heavy snow|Ice pellets|Light sleet|Moderate or heavy sleet|Light snow showers|Moderate or heavy snow showers|Light showers of ice pellets|Moderate or heavy showers of ice pellets|Patchy light snow with thunder|Moderate or heavy snow with thunder)$/i;
  const sunRainRegex = /^(Thundery outbreaks possible)$/i;
  console.log(selectedForecast.description);
  const icon = data.forecast.map((item) => {
    if (sunRegex.test(item.description)) {
      return '/Sun.svg';
    } else if (cloudyRegex.test(item.description)) {
      return '/Clouds.svg';
    } else if (rainRegex.test(item.description)) {
      return '/Rain.svg';
    } else if (snowyRegex.test(item.description)) {
      return '/Snow.svg';
    } else if (sunRainRegex.test(item.description)) {
      return '/Sun-Rain.svg';
    } else {
      return '/sun.svg';
    }
  });
  return (
    <div className="w-1/4 px-6 py-8 dark:bg-black">
      <Searchbar />
      <div className="pl-10 pt-10">
        <img src={icon[selectedDayIndex]} width={170} alt={icon[selectedDayIndex]} />
      </div>
      <div className="pt-10 pl-4 flex">
        <h1 className="text-8xl font-light">{selectedForecast.temp.toFixed(1)}</h1>
        {tempUnit === 'celsius' ? <RiCelsiusLine size={60} /> : <TbTemperatureFahrenheit size={60}/>}
      </div>
      <p className="pt-4 pl-6">
        <span className="font-medium">{day},</span> 12:00
      </p>
      <div className="flex pl-6 py-8">
        <div className="w-3/4 border-gray-200 border" />
      </div>
      <div className="flex flex-col gap-2 pl-6">
        <div className="flex gap-2 items-center">
          <CiCloud />
          <p className="text-sm">{selectedForecast.description}</p>
        </div>
        <div className="flex gap-2 items-center">
          <IoReorderFourOutline />
          <p className="text-sm">Rain - {selectedForecast.rainChance}%</p>
        </div>
        {/* <div className="relative w-3/4 h-24 mt-10 bg-gray-200">
          <img src="myCity.jpg" alt="city" className="w-full rounded-lg h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold">{data.location.city}, {data.location.country}</span>
          </div>
        </div> */}
        <div className="text-sm">
          <p> <span className="font-semibold">{data.location.city}</span>, {data.location.country}</p>
        </div>
      </div>
    </div>
  );
}
