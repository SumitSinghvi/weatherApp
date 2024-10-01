import { useSelector } from "react-redux";
import { RiCelsiusLine } from "react-icons/ri";
import { CiCloud } from "react-icons/ci";
import { IoReorderFourOutline } from "react-icons/io5";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { Location, WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";

import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import { getIcons } from "@/utils/getIcons";


/**
 * it displays the avg temp of the day with city name
 * it also displays the weather icon
 * it also displays the weather description
 */
export default function Sidebar({
  setNav,
  nav,
}: {
  setNav: (nav: string) => void;
  nav: string;
}) {

  // used to get the data from the store
  const data = useSelector(
    (state: { weather: { forecast: WeatherItems[]; location: Location } }) =>
      state.weather
  );
  const day = useSelector(
    (state: { dayandtemp: { day: string } }) => state.dayandtemp.day
  );

  const selectedDayIndex = data.forecast.findIndex(
    (forecastItem) => DateToDay(forecastItem.dt) === day
  );
  const selectedForecast =
    selectedDayIndex !== -1
      ? data.forecast[selectedDayIndex]
      : data.forecast[0];

  const tempUnit = useSelector(
    (state: { weather: { tempUnit: string } }) => state.weather.tempUnit
  );

  //use to get the weather icon according to the description
  const icons = data.forecast.map((item) => item.description);
  const iconList = getIcons(icons);

  return (
    <div className="md:w-1/4 lg:w-1/5 px-6 py-8 dark:bg-black w-full">
      <Searchbar />
      <div className="pt-8 md:hidden">
        <Navbar setNav={setNav} nav={nav} />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <div className="md:pl-10 md:pt-10 pt-6">
          <img
            src={iconList[selectedDayIndex]}
            className="md:w-[170px] w-[100px]"
            alt={iconList[selectedDayIndex]}
            data-testid="my-image"
          />
        </div>
        <div className="md:pt-10 md:pl-4 flex items-center md:items-start">
          <h1 className="md:text-8xl font-light text-5xl">
            {selectedForecast.temp.toFixed(1)}
          </h1>
          {tempUnit === "celsius" ? (
            <RiCelsiusLine size={60} />
          ) : (
            <TbTemperatureFahrenheit size={60} />
          )}
        </div>
        <p className="pt-4 md:pl-6 pr-2 text-[14px] md:text-lg">
          <span className="font-medium">{day},</span> 12:00
        </p>
      </div>
      <div className="flex md:pl-6 md:py-8 py-4 justify-center md:justify-start">
        <div className="w-3/4 border-gray-200 border" />
      </div>
      <div className="flex flex-col gap-2 md:pl-6 pl-8">
        <div className="flex flex-row md:flex-col md:gap-2 gap-6 ">
          <div className="flex gap-2 items-center">
            <CiCloud />
            <p className="md:text-sm text-[14px]">
              {selectedForecast.description}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <IoReorderFourOutline />
            <p className="md:text-sm text-[14px]">
              Rain - {selectedForecast.rainChance}%
            </p>
          </div>
        </div>
        <div className="md:text-sm text-[14px]">
          <p>
            <span className="font-semibold">{data.location.city}</span>,{" "}
            {data.location.country}
          </p>
        </div>
      </div>
    </div>
  );
}
