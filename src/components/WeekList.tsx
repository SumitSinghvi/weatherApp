import Card from "./Card";
import useDayAndTemp from "../hooks/useDayAndTemp";
// import useUpdateDay from "../hooks/useUpdateDay";

export default function WeekList() {
  const { weekTempAndDay } = useDayAndTemp();
  return (
    <div className="flex gap-2 mt-10">
      {weekTempAndDay.map((d: { day: string; temp: string;}) => (
          <div key={d.day}>
          <Card
            day={d.day}
            temp={d.temp}
            dif=""
            icon="./Sun.svg"
            />
          </div>
      ))}
    </div>
  );
}
