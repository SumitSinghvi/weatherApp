import { useDispatch, useSelector } from "react-redux";
import { setDay, setTemp } from "../slices/dayAndTempSlice";

export default function Card({
  day,
  temp: temparature,
  dif,
  icon,
  // onClick,
}: {
  day: string ;
  temp: string;
  dif: string;
  icon: string;
  // onClick: () => void;
}) {
  const dayName = useSelector((state: { dayandtemp: { day: string }}) => state.dayandtemp.day);
  const dispatch = useDispatch();
  const handleDayClick = () => {
    dispatch(setDay(day));
    dispatch(setTemp(temparature));
  };
  return (
    <div
      onClick={handleDayClick}
      className="rounded-lg bg-white w-32 p-2 flex flex-col font-semibold items-center gap-4 text-sm"
    >
      <h1>{day == dayName ? <b>{day}</b> : day }</h1>
      <img width={100} src={icon} alt="icon" />
      <h1>
        {temparature} {dif}
      </h1>
    </div>
  );
}
