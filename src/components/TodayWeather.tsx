import { useSelector } from "react-redux";
import HighlightCard from "./HighlightCard";
import { type WeatherItems } from "../slices/weatherSlice";
import { DateToDay } from "../utils/DateToDay";

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
            <p className="text-5xl">{selectedForecast.uvIndex}</p>
          </HighlightCard.Middle>
        </HighlightCard>
        <HighlightCard>
          <HighlightCard.Head>
            <h3 className="">Wind Speed</h3>
          </HighlightCard.Head>
          <HighlightCard.Middle>
            <p className="text-5xl">{selectedForecast.windSpeed}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">WSW</p>
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
          <HighlightCard.Middle>
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
          <HighlightCard.Middle>
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
          <HighlightCard.Middle>
            <p className="text-5xl">{selectedForecast.airQuality}</p>
          </HighlightCard.Middle>
          <HighlightCard.Bottom>
            <p className="text-sm font-semibold">Unheathly</p>
          </HighlightCard.Bottom>
        </HighlightCard>
      </div>
    </div>
  );
}

const GaugeComponent = ({ value }: { value: number }) => {
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const maxValue = 12; // Maximum value for the gauge
  const minValue = 0; // Minimum value for the gauge
  const valuePercentage = ((value - minValue) / (maxValue - minValue)) * 100; // Percentage value for the gauge
  const dashOffset = circumference - (valuePercentage / 100) * circumference; // Calculate stroke-dashoffset for the gauge arc

  return (
    <div className="flex items-center justify-center rounded-lg w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 50">
        {/* Background Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeWidth="8"
          stroke="#E5E7EB"
          strokeDasharray={circumference}
        />

        {/* Foreground Arc */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          strokeWidth="8"
          stroke="#FBBF24"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />

        {/* Text Value */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-black font-semibold text-xl"
        >
          {value}
        </text>
      </svg>
    </div>
  );
};
