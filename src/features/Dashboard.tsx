import Navbar from "../components/Navbar";
import TodayWeather from "../components/TodayWeather";
import WeekList from "../components/WeekList";

export default function Dashboard() {
    return (
    <div className="flex-grow bg-gray-100 p-10">
        <Navbar />
        <WeekList />
        <TodayWeather />
    </div>
  )
}
