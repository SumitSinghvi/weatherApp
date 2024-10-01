import { useSelector } from "react-redux";
import { HourToString } from "../utils/HourToString";
import { getIcons } from "@/utils/getIcons";

interface RootTemp {
    dt: string;
    temp: number;
  }

export default function useTodayHourAndTemp() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const forecast = useSelector((state: any) => state.todayweather.forecast);
  const description = forecast.map((item: { description: string }) => item.description);

  const iconList = getIcons(description);


  const todayTempAndHour = forecast.map((item: RootTemp, index: number) => ({
    hr: HourToString(item.dt),
    temp: item.temp,
    icon: iconList[index]
  }));
  return { todayTempAndHour };
}
