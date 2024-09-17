import Navbar from "../components/Navbar";
import TodayWeather from "../components/TodayWeather";
import WeekList from "../components/WeekList";


export default function Dashboard({setNav, nav}: {setNav: (nav: string) => void, nav: string}) {
  
    return (
    <div className="flex flex-col flex-1 bg-slate-100 p-10 dark:bg-slate-900">
      <div className="hidden md:block">
        <Navbar setNav={setNav} nav={nav}/>
      </div>
        <WeekList nav={nav} />
        <TodayWeather nav={nav}/>
    </div>
  )
}
