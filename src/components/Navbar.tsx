import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setTempUnitValues } from "../slices/weatherSlice";
import { setTodayTempUnitValues } from "../slices/todayWeatherSlice";
import { setPrevWeekTempUnitValues } from "../slices/prevWeekTempSlice";
import DarkModeToggle from "./DarkModeToggle";
import { NavbarProps } from "@/type";


/**
 * this component is used to switch between the weather data for today and for the week
 * it also contains the dark mode toggle
 */
export default function Navbar({setNav, nav}: NavbarProps) {
  const tempUnit = useSelector((state: { weather: { tempUnit: string }}) => state.weather.tempUnit);
  const dispatch = useDispatch();
  return (
    <div className=" flex flex-col md:flex-row gap-5 items-center justify-between text-base md:text-2xl">
      <div className="space-x-10">
        <button className={`${nav == 'today' ? 'border-b-2 border-black dark:border-white' : ''}`} onClick={() => setNav('today')}>Today</button>
        <button className={`${nav == 'week' ? 'border-b-2 border-black dark:border-white' : ''}`} onClick={() => setNav('week')}>Week</button>
      </div>
      <div className="space-x-10 flex items-center justify-between">
            <div className="space-x-4">
            <button
            disabled={tempUnit == 'celsius'}
            onClick={() => {
              dispatch(setTempUnitValues(false));
              dispatch(setPrevWeekTempUnitValues(false));
              dispatch(setTodayTempUnitValues(false));
            }}
            className={`md:text-xl text-sm py-1 px-2 font-semibold rounded-full ${tempUnit == 'celsius' ? 'bg-black text-white' : 'bg-white text-black'}`}>°C</button>
            <button
            disabled={tempUnit == 'fahrenheit'}
            onClick={() => { 
              dispatch(setTempUnitValues(true));
              dispatch(setPrevWeekTempUnitValues(true));
              dispatch(setTodayTempUnitValues(true));
            }}
            className={`md:text-xl text-sm py-1 px-2 font-semibold rounded-full ${tempUnit == 'fahrenheit' ? 'bg-black text-white' : 'bg-white text-black'}`}>°F</button>
        </div>
        <DarkModeToggle />
        <CgProfile size={40}/>
      </div>
    </div>
  )
}
