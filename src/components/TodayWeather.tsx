import { useSelector } from "react-redux";
import HighlightCard from "./HighlightCard";

interface RootData {
  index: string;
  content: string;
  unit: string;
  detail: string;
  component?: React.ReactNode; 
}

export default function TodayWeather() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Todaydata = useSelector((state: any) => state.weather);
  const dayName = useSelector((state: { dayandtemp: { day: string }}) => state.dayandtemp.day);
  const data: RootData[] = [
    {
      index: "UV Index",
      content: Todaydata.forecast[0].uvIndex,
      unit: '',
      detail: "",
      component: <GaugeComponent value={5}/>,
    },
    {
      index: "Wind Status",
      content: Todaydata.forecast[0].windSpeed,
      unit: 'km/h',
      detail: "WSW",
    },
    {
      index: "Sunrise & Sunset",
      content: Todaydata.forecast[0].sunrise,
      unit: '5:42 PM',
      detail: "",
    },
    {
      index: "Humidity",
      content: Todaydata.forecast[0].humidity,
      unit: '%',
      detail: "Normal",
    },
    {
      index: "Visibility",
      content: Todaydata.forecast[0].visibility,
      unit: 'km',
      detail: "Average",
    },
    {
      index: "Air Quality",
      content: Todaydata.forecast[0].airQuality.toString().substring(0, 4),
      unit: 'pm2.5',
      detail: "Good",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
      <h1 className="text-lg py-6 font-semibold">{dayName}'s Highlights</h1>
        {data.map((item, index) => (
          <HighlightCard key={index}>
            <HighlightCard.Head>
              <h3 className="">{item.index}</h3>
            </HighlightCard.Head>
            <HighlightCard.Middle>
              {item.component ? item.component : 
                <p className="text-5xl">{item.content}</p>}
            </HighlightCard.Middle>
            <HighlightCard.Unit>
              <p className="">{item.unit}</p>
            </HighlightCard.Unit>
            <HighlightCard.Bottom>
              <p className="">{item.detail}</p>
            </HighlightCard.Bottom>
          </HighlightCard>
        ))}
      </div>
    </div>
  );
}


const GaugeComponent = ({ value }: { value: number}) => {
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




