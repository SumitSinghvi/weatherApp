import { useSelector } from "react-redux";
import HighlightCard from "./HighlightCard";
import { type WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";
import { FaLocationDot } from "react-icons/fa6";
import GaugeChart from "./GaugeChart";
import { HourToString } from "../utils/HourToString";
import { timeDifference } from "@/utils/timeDifference";


export default function TodayWeather({nav}: {nav: string}) {
  const data = useSelector((state: { weather: { forecast: WeatherItems[]}}) => state.weather);
  const day = useSelector((state: { dayandtemp: { day: string}}) => state.dayandtemp.day);
  const hourlyData = useSelector((state: { todayweather: { forecast: WeatherItems[], astro: { sunrise: string, sunset: string}}}) => state.todayweather);
  const hour = useSelector((state: { hourandtemp: { hour: string}}) => state.hourandtemp.hour);
  
  const selectedHourIndex = hourlyData.forecast.findIndex((forecastItem) => HourToString(forecastItem.dt) === hour);
  // console.log(hour, 'hi')
  // console.log(hourlyData.forecast[0].dt)
  // console.log(selectedHourIndex, 'index')
  const selectedDayIndex = data.forecast.findIndex((forecastItem) => DateToDay(forecastItem.dt) === day);
  const selectedForecast = selectedDayIndex !== -1 ? data.forecast[selectedDayIndex] : data.forecast[0];
  const selectedForecastToday = selectedHourIndex !== -1 ? hourlyData.forecast[selectedHourIndex] : hourlyData.forecast[0];

  const prevWeekForecast = useSelector((state: { prevweektemp: { forecast: { sunrise: string, sunset: string}[]}}) => state.prevweektemp.forecast);
  const sunSetDiff = timeDifference(data.forecast[selectedDayIndex+1].sunset, prevWeekForecast[selectedDayIndex != 6 ? selectedDayIndex+1: selectedDayIndex].sunset);
  const sunRiseDiff = timeDifference(prevWeekForecast[selectedDayIndex+1].sunrise, data.forecast[selectedDayIndex != 6 ? selectedDayIndex+1: selectedDayIndex].sunrise);
  if(nav == 'today'){
    return (
      <div>
      <h1 className="text-lg py-6 font-semibold">Hour - {hour}'s Highlights</h1>
      <div className="grid grid-cols-3 gap-4">
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">UV Index</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle>
            <div className="w-full flex justify-center">
              <GaugeChart value={selectedForecastToday.uvIndex}/>
            </div>
          {/* <GaugeChart value={20}/> */}
            {/* <p className="text-5xl">{selectedForecastToday.uvIndex}</p> */}
          </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Wind Speed</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="km/h" loc="bottom">
            <p className="text-5xl">
              {selectedForecastToday.windSpeed}
              </p>
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
              <SunriseandSunset sunrise={selectedForecast.sunrise} sunset={selectedForecast.sunset} sunSetDif={sunSetDiff} sunRiseDif={sunRiseDiff} />
            </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Humidity</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="%" loc="top">
            <p className="text-5xl">{selectedForecastToday.humidity}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">{selectedForecastToday.humidity < 30 ? 'Low (Dry)' : selectedForecastToday.humidity <= 60 ? 'Normal (Comfortable)' : selectedForecastToday.humidity <= 80 ? 'High (Humid)' : 'Very High (Excessive)'}</p>
          </HighlightCard.Bottom>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Visibility</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="km" loc="bottom">
            <p className="text-5xl">{selectedForecastToday.visibility}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">{selectedForecastToday.visibility <= 10 ? 'low' : selectedForecastToday.visibility <= 10 ? 'Normal' : 'high'}</p>
          </HighlightCard.Bottom>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Air Quality</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle  unit="PM2.5" loc="top">
            <p className="text-5xl">{selectedForecastToday.airQuality ? selectedForecastToday.airQuality?.toFixed(2): 'N/A'}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">{selectedForecastToday.airQuality < 12 ? 'Good' : selectedForecastToday.airQuality <= 35 ? 'Moderate' : selectedForecastToday.airQuality <= 55 ? 'Unhealthy' : selectedForecastToday.airQuality <= 150 ? 'Hazardous' : 'Unknown'}</p>
          </HighlightCard.Bottom>
        </HighlightCard>
      </div>
    </div>
    )
  }

  return (
    <div>
      <h1 className="text-lg py-6 font-semibold">{selectedDayIndex == 0 ? 'Today' : day}'s Highlights</h1>
      <div className="grid grid-cols-3 gap-4">
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">UV Index</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle>
            <div className="w-full flex justify-center">
              <GaugeChart value={selectedForecast.uvIndex}/>
            </div>
          {/* <GaugeChart value={20}/> */}
            {/* <p className="text-5xl">{selectedForecast.uvIndex}</p> */}
          </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Wind Speed</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle unit="km/h" loc="bottom">
            <p className="text-5xl">
              {selectedForecast.windSpeed}
              </p>
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
            
              <SunriseandSunset sunrise={selectedForecast.sunrise} sunset={selectedForecast.sunset} sunSetDif={sunSetDiff} sunRiseDif={sunRiseDiff}/>

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
            <p className="text-sm font-semibold">{selectedForecast.humidity < 30 ? 'Low (Dry)' : selectedForecast.humidity <= 60 ? 'Normal (Comfortable)' : selectedForecast.humidity <= 80 ? 'High (Humid)' : 'Very High (Excessive)'}</p>
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
            <p className="text-sm font-semibold">{selectedForecast.visibility <= 10 ? 'low' : selectedForecast.visibility <= 10 ? 'Normal' : 'high'}</p>
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
            <p className="text-sm font-semibold">{selectedForecast.airQuality < 12 ? 'Good' : selectedForecast.airQuality <= 35 ? 'Moderate' : selectedForecast.airQuality <= 55 ? 'Unhealthy' : selectedForecast.airQuality <= 150 ? 'Hazardous' : 'Unknown'}</p>
          </HighlightCard.Bottom>
        </HighlightCard>
      </div>
    </div>
  );
};


// const GaugeChart = ({ value, min = 0, max = 100 }: { value: number, min?: number, max?: number}) => {
//   // const percentage = ((value - min) / (max - min)) * 100;
//   // const clampedPercentage = Math.min(100, Math.max(0, percentage));
//   // const rotation = (clampedPercentage / 100) * 180;

//   return (
//     <div className="w-[250px] h-24 relative border-gray-200 border-[10px] border-b-0" style={{borderRadius: '250px 250px 0 0'}}>
//       <span className="absolute bottom-0 left-[50%] translate-x-[-50%] text-5xl">{value}</span>
//   </div>
//   );
// };




const SunriseandSunset = ({sunrise, sunset, sunRiseDif, sunSetDif}: {sunrise: string, sunset: string, sunSetDif: string, sunRiseDif: string}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-center">
      <img src="./Sun_Arrow_Up.svg" alt="sunrise" width={60} />
      <div>
      <p className="text-2xl">{sunrise.substring(1, )}</p>
      <span className="text-slate-500 font-sans">{sunRiseDif}</span>
      </div>
      
      </div>
      <div className="flex gap-2 items-center justify-center">
      <img src="./Sun_Arrow_Down.svg" alt="subset" width={60}/>
      <div >
      <p className="text-2xl">{sunset.substring(1, )}</p>
      <span className="text-slate-500 font-sans">{sunSetDif}</span>
      </div>
      </div>
    </div>
  )
}