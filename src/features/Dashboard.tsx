import { useState } from "react";
import Navbar from "../components/Navbar";
import TodayWeather from "../components/TodayWeather";
import WeekList from "../components/WeekList";

export default function Dashboard() {
  const [nav, setNav] = useState<string>('week');
    return (
    <div className="flex-grow bg-slate-100 p-10 dark:bg-slate-900">
        <Navbar setNav={setNav} nav={nav}/>
        <WeekList nav={nav} />
        <TodayWeather nav={nav}/>
    </div>
  )
}
