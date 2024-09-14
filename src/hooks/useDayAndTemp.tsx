import { useSelector } from "react-redux";
import { WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";

interface RootTemp {
    day: string;
    temp: number;
    date: string;
  }

export default function useDayAndTemp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast = useSelector((state: any) => state.weather.forecast);
  const weekTempAndDay: RootTemp[] = forecast.map((item: WeatherItems) => ({
    day: DateToDay(item.dt),
    temp: item.temp,
  }));
  if(weekTempAndDay[0].day === 'Invalid Date') {
    return { weekTempAndDay: [{ day: 'Today', temp: 0}] };
  }
  return { weekTempAndDay };
}
