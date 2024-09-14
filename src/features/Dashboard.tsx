import { useState } from "react";
import Navbar from "../components/Navbar";
import TodayWeather from "../components/TodayWeather";
import WeekList from "../components/WeekList";

export default function Dashboard() {
  const [nav, setNav] = useState<string>('week');
    return (
    <div className="flex-grow bg-gray-100 p-10">
        <Navbar setNav={setNav} nav={nav}/>
        <WeekList nav={nav} />
        <TodayWeather nav={nav}/>
    </div>
  )
}
