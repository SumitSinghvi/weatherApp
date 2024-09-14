import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setTempUnitValues } from "../slices/weatherSlice";
import { setTodayTempUnitValues } from "../slices/todayWeatherSlice";


// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default function Navbar({setNav, nav}: {setNav: Function, nav: string}) {
  const tempUnit = useSelector((state: { weather: { tempUnit: string }}) => state.weather.tempUnit);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between text-2xl">
      <div className="space-x-10">
        <button className={`${nav == 'today' ? 'border-b-2 border-black' : ''}`} onClick={() => setNav('today')}>Today</button>
        <button className={`${nav == 'week' ? 'border-b-2 border-black' : ''}`} onClick={() => setNav('week')}>Week</button>
      </div>
      <div className="space-x-10 flex items-center justify-between">
            <div className="space-x-4">
            <button
            disabled={tempUnit == 'celsius'}
            onClick={() => {
              dispatch(setTempUnitValues(false));
              dispatch(setTodayTempUnitValues(false));
            }}
            className={`text-xl py-1 px-2 font-semibold rounded-full ${tempUnit == 'celsius' ? 'bg-black text-white' : 'bg-white text-black'}`}>°C</button>
            <button
            disabled={tempUnit == 'fahrenheit'}
            onClick={() => { 
              dispatch(setTempUnitValues(true));
              dispatch(setTodayTempUnitValues(true));
            }}
            className={`text-xl py-1 px-2 font-semibold rounded-full ${tempUnit == 'fahrenheit' ? 'bg-black text-white' : 'bg-white text-black'}`}>°F</button>
        </div>
        <CgProfile size={40}/>
      </div>
    </div>
  )
}
