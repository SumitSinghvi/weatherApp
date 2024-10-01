import Card from "./Cards";
import useDayAndTemp from "../hooks/useDayAndTemp";
import useTodayHourAndTemp from "../hooks/useTodayHourAndTemp";
import TodayWeatherCarousel from "./TodayWeatherCarousel";

/**
 * used to display the weather data for the week and hourly, depending on the nav
 */
export default function WeekList({ nav }: { nav: string }) {
  const { weekTempAndDay } = useDayAndTemp();
  const { todayTempAndHour } = useTodayHourAndTemp();
  if (nav === "today") {
    return (
      <div >
        <div className="md:w-full md:p-5 ">
          <TodayWeatherCarousel data={todayTempAndHour} />
        </div>
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
