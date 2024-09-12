import { useSelector } from "react-redux";
import { WeatherItems } from "../slices/weatherSlice";

interface RootTemp {
    day: string;
    temp: number;
  }

export default function useDayAndTemp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast = useSelector((state: any) => state.weather.forecast);
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  const weekTempAndDay: RootTemp[] = forecast.map((item: WeatherItems) => ({
    day: getDayOfWeek(item.dt),
    temp: item.temp,
  }));
  if(weekTempAndDay[0].day === 'Invalid Date') {
    return { weekTempAndDay: [{ day: 'Today', temp: 0}] };
  }
  return { weekTempAndDay };
}
