import { useSelector } from "react-redux";
import HighlightCard from "./HighlightCard";
import { type WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";
import { FaLocationDot } from "react-icons/fa6";


export default function TodayWeather() {
  const data = useSelector((state: { weather: { forecast: WeatherItems[], location: Location}}) => state.weather);
  const day = useSelector((state: { dayandtemp: { day: string}}) => state.dayandtemp.day);
  
  const selectedDayIndex = data.forecast.findIndex((forecastItem) => DateToDay(forecastItem.dt) === day);
  const selectedForecast = selectedDayIndex !== -1 ? data.forecast[selectedDayIndex] : data.forecast[0];

  return (
    <div>
      <h1 className="text-lg py-6 font-semibold">{selectedDayIndex == 0 ? 'Today' : day}'s Highlights</h1>
      <div className="grid grid-cols-3 gap-4">
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">UV Index</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle>
            <GaugeChart value={20}/>
            {/* <p className="text-5xl">{selectedForecast.uvIndex}</p> */}
          </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Wind Speed</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="km/h" loc="bottom">
            <p className="text-5xl">{selectedForecast.windSpeed}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold flex gap-2 items-center"><span className="border p-1 rounded-full rotate-45"><FaLocationDot /></span>WSW</p>
          </HighlightCard.Bottom>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Sunrise & Sunset</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle>
            <p className="text-5xl">{selectedForecast.sunrise}, {selectedForecast.sunset}</p>
          </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Humidity</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="%" loc="top">
            <p className="text-5xl">{selectedForecast.humidity}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">Normal</p>
          </HighlightCard.Bottom>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Visibility</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="km" loc="bottom">
            <p className="text-5xl">{selectedForecast.visibility}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">Average</p>
          </HighlightCard.Bottom>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Air Quality</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle  unit="PM2.5" loc="top">
            <p className="text-5xl">{selectedForecast.airQuality ? selectedForecast.airQuality?.toFixed(2): 'N/A'}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">Unheathly</p>
          </HighlightCard.Bottom>
        </HighlightCard>
      </div>
    </div>
  );
};


const GaugeChart = ({ value, min = 0, max = 100 }: { value: number, min?: number, max?: number}) => {
  // const percentage = ((value - min) / (max - min)) * 100;
  // const clampedPercentage = Math.min(100, Math.max(0, percentage));
  // const rotation = (clampedPercentage / 100) * 180;

  return (
    <div className="w-[250px] h-24 relative border-gray-200 border-[10px] border-b-0" style={{borderRadius: '250px 250px 0 0'}}>
      <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-5xl">{value}</span>
  </div>
  );
};


// const GaugeChart = ({ value = 50 }) => {
//   const normalizedProgress = Math.min(100, Math.max(0, value));
//   const rotation = (normalizedProgress / 100) * 180 ;

//   return (
//     <div className="relative w-[250px] h-24 border-gray-200 rounded-t-full overflow-hidden">
//       <div 
//         className="absolute rounded-t-full bottom-0 left-0 right-0 border-b-0 border-[20px] border-yellow-500 origin-bottom"
//         style={{
//           height: '100%',
//           transform: `rotate(${rotation}deg)`,
//           transition: 'transform 0.3s ease-out',
//         }}
//       />
//       <div className="absolute inset-0 top-6 flex justify-center items-center">
//         <span className="text-6xl">{value}</span>
//       </div>
//     </div>
//   );
// };
