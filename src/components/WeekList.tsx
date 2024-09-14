import Card from "./Card";
import useDayAndTemp from "../hooks/useDayAndTemp";
import useTodayHourAndTemp from "../hooks/useTodayHourAndTemp";
import TodayWeatherCarousel from "./TodayWeatherCarousel";

export default function WeekList({ nav }: { nav: string }) {
  const { weekTempAndDay } = useDayAndTemp();
  const { todayTempAndHour } = useTodayHourAndTemp();
  if (nav === "today") {
    return (
      <div>
        <TodayWeatherCarousel data={todayTempAndHour}/>
      </div>
    );
  }
  return (
    <div className="flex gap-2 mt-10">
      {weekTempAndDay.map((d: { day: string; temp: number }) => (
        <div key={d.day}>
          <Card day={d.day} temp={d.temp} dif="" icon="./Sun.svg" />
        </div>
      ))}
    </div>
  );
}
