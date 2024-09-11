import { useSelector } from "react-redux";
import { WeatherItems } from "../slices/weatherSlice";

interface RootState{
    city: {
        city: string;
        state: string;
        country: string;
    }
}



export default function Dashboard() {
    const city = useSelector((state: RootState) => state.city);
    const data = useSelector((state: WeatherItems) => state.weather);
    console.log(data)
    return (
    <div>
        {city.city}
    </div>
  )
}
