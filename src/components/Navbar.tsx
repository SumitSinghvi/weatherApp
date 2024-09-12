import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { setTempUnitValues } from "../slices/weatherSlice";


export default function Navbar() {
  const tempUnit = useSelector((state: { weather: { tempUnit: string }}) => state.weather.tempUnit);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-between text-2xl">
      <div className="space-x-10">
        <button>Today</button>
        <button className="border-b-2 border-black">Week</button>
      </div>
      <div className="space-x-10 flex items-center justify-between">
            <div className="space-x-4">
            <button
            disabled={tempUnit == 'celsius'}
            onClick={() => {
              dispatch(setTempUnitValues(false));
            }}
            className={`text-xl py-1 px-2 font-semibold rounded-full ${tempUnit == 'celsius' ? 'bg-black text-white' : 'bg-white text-black'}`}>°C</button>
            <button
            disabled={tempUnit == 'fahrenheit'}
            onClick={() => { 
              dispatch(setTempUnitValues(true));
            }}
            className={`text-xl py-1 px-2 font-semibold rounded-full ${tempUnit == 'fahrenheit' ? 'bg-black text-white' : 'bg-white text-black'}`}>°F</button>
        </div>
        <CgProfile size={40}/>
      </div>
    </div>
  )
}
