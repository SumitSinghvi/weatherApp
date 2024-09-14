import { useDispatch, useSelector } from "react-redux";
import { setDay, setTemp } from "../slices/dayAndTempSlice";
import { setHour, setHourTemp } from "../slices/hourAndTempSlice";

export default function Card({
  day,
  temp: temparature,
  dif,
  icon,
}: // onClick,
{
  day: string;
  temp: number;
  dif: string;
  icon: string;
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
  const handleDayClick = async() => {
    if (regex.test(day)) {
      dispatch(setTemp(temparature));
      dispatch(setDay(day));
    } else {
      dispatch(setHour(day));
      dispatch(setHourTemp(temparature));
    }
  };
  return (
    <div
      onClick={handleDayClick}
      className="rounded-lg bg-white flex flex-col font-semibold items-center gap-4 text-sm"
    >
      {!regex.test(day) ? (
        <h1 className="capitalize">
          Hour {currentHour == day ? <b>{day}</b> : day}
        </h1>
      ) : (
        <h1 className="capitalize">{day == dayName ? <b>{day}</b> : day}</h1>
      )}
      <img width={100} src={icon} alt="icon" />
      <h1>
        Temp - {temparature.toFixed(1)} {dif}
      </h1>
    </div>
  );
}
