import { useDispatch, useSelector } from "react-redux";
import { setDay, setTemp } from "../slices/dayAndTempSlice";
import { setHour, setHourTemp } from "../slices/hourAndTempSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function 
Cards({
  day,
  temp: temparature,
  icon,
  prevTemp = 0,
}: // onClick,
{
  day: string;
  temp: number;
  icon: string;
  prevTemp?: number;
  // onClick: () => void;
}) {
  const dayName = useSelector(
    (state: { dayandtemp: { day: string } }) => state.dayandtemp.day
  );
  const currentHour = useSelector(
    (state: { hourandtemp: { hour: string } }) => state.hourandtemp.hour
  );
  // const date = useSelector(
  //   (state: { weather: { forecast: WeatherItems[] } }) =>
  //     state.weather.forecast[0].dt
  // );
  const dispatch = useDispatch();
  const regex = /day/;
  const handleDayClick = async () => {
    if (regex.test(day)) {
      dispatch(setTemp(temparature));
      dispatch(setDay(day));
    } else {
      dispatch(setHour(day));
      dispatch(setHourTemp(temparature));
    }
  };
  const dif = temparature - prevTemp;
  return (
    // <div
    //   onClick={handleDayClick}
    //   className="rounded-lg dark:bg-slate-700 bg-white flex flex-col font-semibold items-center gap-4 text-sm"
    // >
    //   {!regex.test(day) ? (
    //     <h1 className="capitalize">
    //       Hour {currentHour == day ? <b>{day}</b> : day}
    //     </h1>
    //   ) : (
    //     <h1 className="capitalize">{day == dayName ? <b>{day}</b> : day}</h1>
    //   )}
    //   <img width={100} src={icon} alt={icon} />
    //   <h1 className="space-x-2 flex">
    //     <p className="font-semibold">{temparature.toFixed(1)}</p>
    //     <span className="text-slate-400">{dif.toFixed(1)}</span>
    //   </h1>
    // </div>
    <div onClick={handleDayClick}>
      <Card>
        <CardHeader>
          <CardTitle className="text-[0.55rem] md:text-base">
          {!regex.test(day) ? (
            <h1 className="capitalize">
              Hour {currentHour == day ? <b>{day}</b> : day}
            </h1>
          ) : (
            <h1 className="capitalize">{day == dayName ? <b>{day}</b> : day}</h1>
          )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img width={100} src={icon} alt={icon} />
        </CardContent>
        <CardFooter>
          <CardDescription className="dark:text-slate-100 text-[0.55rem] md:text-base text-slate-900">Temp {temparature.toFixed(1)} <span className="text-slate-400">{dif.toFixed(1) == temparature.toFixed(1) ? "" : dif.toFixed(1)}</span></CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
