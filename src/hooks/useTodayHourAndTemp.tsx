import { useSelector } from "react-redux";
import { HourToString } from "../utils/HourToString";

interface RootTemp {
    dt: string;
    temp: number;
  }

export default function useTodayHourAndTemp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast = useSelector((state: any) => state.todayweather.forecast);
  const todayTempAndHour = forecast.map((item: RootTemp) => ({
    hr: HourToString(item.dt),
    temp: item.temp,
  }));
  return { todayTempAndHour };
}
