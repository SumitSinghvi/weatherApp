// import { RootHourItem } from "@/components/Searchbar";
// import { getWeatherByDate } from "@/services/apiWeatherByDate";
// import { setTodayWeatherList } from "@/slices/todayWeatherSlice";
// import { useDispatch } from "react-redux";

// export const updateDate = async(date: string, city: string, country: string) => {
//     const todaCityData = await getWeatherByDate(date, city, country);
//     const todayDataToStore = {
//       location: {
//         city: todaCityData.location.name,
//         country: todaCityData.location.country,
//       },
//       tempUnit: 'celsius',
//       forecast: todaCityData.forecast.forecastday[0].hour
//       .map((item: RootHourItem) => ({
//         dt: item.time,
//         temp: item.temp_c,
//         uvIndex: item.uv,
//         windSpeed: item.wind_kph,
//         humidity: item.humidity,
//         visibility: item.vis_km,
//         airQuality: item.air_quality.pm2_5,
//         description: item.condition.text,
//         rainChance: item.chance_of_rain,
//       })),
//       astro: {
//         sunrise: todaCityData.forecast.forecastday[0].astro.sunrise,
//         sunset: todaCityData.forecast.forecastday[0].astro.sunset,
//       }
//     }
// }