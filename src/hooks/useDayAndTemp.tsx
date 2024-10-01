import { useSelector } from "react-redux";
import { WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";
import { PrevWeatherItems } from "@/slices/prevWeekTempSlice";
import { getIcons } from "@/utils/getIcons";

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

  const iconList = getIcons(description);

  const weekTempAndDay: RootTemp[] = forecast.map((item: WeatherItems, index: number) => ({
    day: DateToDay(item.dt),
    temp: item.temp,
    prevTemp: prevForecast[index].temp,
    icon: iconList[index],
  }));

  if(weekTempAndDay[0].day === 'Invalid Date') {
    return { weekTempAndDay: [{ day: 'Today', temp: 0, prevTemp: 0, icon: 'Sun.svg'}] };
  }
  return { weekTempAndDay };
}
