// import { FormEvent, KeyboardEvent, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import { getWeather } from "../services/apiWeather";
// import { setWeatherList, WeatherItems } from "../slices/weatherSlice";


// type WeatherItemAPI = {
//     dt: number;
//     sunrise: number;
//     sunset: number;
//     temp: {
//       day: number;
//     };
//     uvi?: number; 
//     speed: number; 
//     humidity: number;
//     visibility: number;
//     air_quality?: number;
//     weather: {
//       description: string;
//     }[];
//     pop: number; 
//   };
  

// export default function Searchbar() {
//   const [query, setQuery] = useState("");
//   const [cities, setCities] = useState([]);
//   // const [index, setIndex] = useState(-1);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const abortController = new AbortController();
//     const { signal } = abortController;

//     const fetchCities = async () => {
//       try {
//         const cityData = await getWeather(query, signal);
//         const cityList = cityData.map((obj : { location: { name: string } }) => ({ name: obj.location.name }));
//         setCities(cityList);
//         console.log(cityData);
//       } catch (error: unknown) {
//           if (error instanceof Error) {
//             if (error.message.toLowerCase().includes('canceled')) {
//                 console.log('Fetch aborted');
//             } else {
//                 console.error(error); // Log other errors
//             }
//         } else {
//             console.error('An unexpected error occurred');
//         }
//       }
//     };

//     if (query.length > 2) {
//       fetchCities();
//     }

//     // Clean up function
//     return () => {
//       abortController.abort();
//       setCities([]);
//     };
//   }, [query]);

//   const handleKeyDown = (e: KeyboardEvent) => {
//     // switch (e.key) {
//     //   case "Enter":
//     //     if (index >= 0 && index < cities.length) {
//     //       setQuery(cities[index].name);
//     //       handleSend();
//     //     }
//     //     break;
//     //   case "ArrowUp":
//     //     setIndex((prev) => Math.max(prev - 1, 0));
//     //     break;
//     //   case "ArrowDown":
//     //     setIndex((prev) => Math.min(prev + 1, cities.length - 1));
//     //     break;
//     // }
//   };
//   // sending request to api
//   const handleSend = async () => {
//     const cityData = await getWeather(query);
//     console.log(cityData);
//     if (cityData.length === 0) {
//       toast.error("City not found");
//       return;
//     }
//     const { name: city } = cityData[0];
//     // dispatch(setCity({ city }));
//     const data = await getWeather(cityData[0].name);
//     console.log(data);
//     const weatherData: WeatherItems[] = data.map((item: WeatherItemAPI) => ({
//         dt: item.dt,
//         sunrise: item.sunrise,
//         sunset: item.sunset,
//         temp: item.temp.day,
//         uvIndex: item.uvi || 0,
//         windSpeed: item.speed,
//         humidity: item.humidity,
//         visibility: item.visibility,
//         airQuality: item.air_quality || 0,
//         weather: {
//             description: item.weather[0].description,
//         },
//         rainChance: item.pop,
//     }));
//     dispatch(setWeatherList(weatherData));
//     setQuery("");
//     setCities([]);
//   };

//   // form submition
//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     handleSend();
//   };
//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Search for a place ..."
//       /> 
//       {/* {cities.length > 0 && (
//         <ul>
//           {cities.map((city: { name: string }, i) => (
//             <li
//               key={i}
//               onClick={() => {
//                 setQuery(city.name);
//                 handleSend();
//               }}
//               style={{ background: index === i ? "lightgray" : "transparent" }}
//             >
//               {city.name}
//             </li>
//           ))}
//         </ul>
//       )} */}
//     </form>
//   );
// }
