import Card from "./Cards";
import useDayAndTemp from "../hooks/useDayAndTemp";
import useTodayHourAndTemp from "../hooks/useTodayHourAndTemp";
import TodayWeatherCarousel from "./TodayWeatherCarousel";

export default function WeekList({ nav }: { nav: string }) {
  const { weekTempAndDay } = useDayAndTemp();
  const { todayTempAndHour } = useTodayHourAndTemp();
  if (nav === "today") {
    return (
      <div >
        <div className="md:w-full md:p-5 ">
          <TodayWeatherCarousel data={todayTempAndHour} />
        </div>
        {/* <div className="flex gap-2 mt-10 overflow-x-scroll ">
          {todayTempAndHour.map(
            (d: { hr: string; temp: number; icon: string }) => (
              <div key={d.hr}>
                <Card day={d.hr} temp={d.temp} icon={d.icon} />
              </div>
            )
          )}
        </div> */}
      </div>
    );
  }
  return (
    <div className="flex gap-2 mt-10 overflow-x-scroll md:overflow-hidden">
      {weekTempAndDay.map(
        (d: { day: string; temp: number; icon: string; prevTemp: number }) => (
          <div key={d.day}>
            <Card
              day={d.day}
              temp={d.temp}
              icon={d.icon}
              prevTemp={d.prevTemp}
            />
          </div>
        )
      )}
    </div>
  );
}
