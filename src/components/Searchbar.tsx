import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getWeather } from "../services/apiWeather";
import { setWeatherList } from "../slices/weatherSlice";
import { useDispatch } from "react-redux";
import { DateToDay } from "../utils/DateToDay";
import { setDate, setDay, setTemp } from "../slices/dayAndTempSlice";
import { searchCity } from "../services/apiSearchCity";
import { getTodayWeather } from "../services/apiTodayWeather";
import { setTodayWeatherList } from "../slices/todayWeatherSlice";
import { setHour, setHourTemp } from "@/slices/hourAndTempSlice";
import { getWeatherByDate } from "@/services/apiWeatherByDate";
import { setPrevWeekWeatherList } from "@/slices/prevWeekTempSlice";
import { getPastDate, getTodayDate } from "@/utils/getPrevDate";

export interface RootItem {
  date: string;
  astro: {
    sunrise: string;
    sunset: string;
  };
  day: {
    avgtemp_c: number;
    uv: number;
    maxwind_kph: number;
    avghumidity: number;
    avgvis_km: number;
    air_quality: {
      pm2_5: number;
    };
    condition: {
      text: string;
    };
    daily_chance_of_rain: number;
  };
}
export interface RootHourItem {
  time: string;
    temp_c: number;
    uv: number;
    wind_kph: number;
    humidity: number;
    vis_km: number;
    air_quality: {
      pm2_5: number;
    };
    condition: {
      text: string;
    };
    chance_of_rain: number;
}

interface RootCity {
  name: string;
  country: string;
  lat: string;
  lon: string;
}

interface RootPrevWeek {
  date: string;
  day: {
    avgtemp_c: number;
  }
  astro:{
    sunrise: string;
    sunset: string;
  }
}

interface RootCities {
  cityName: string;
  countryName: string;
  query: string;
}

export default function Searchbar() {
  const hasRun = useRef(false);
  const [query, setQuery] = useState<string>("");
  const [index, setIndex] = useState<number>(-1);
  const dispatch = useDispatch();

  

  const [cities, setCities] = useState<RootCities[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchCities = async () => {
      try {
        const cityData = await searchCity(query, signal);
        const cityList = cityData.map((location: RootCity) => ({
          cityName: location.name,
          countryName: location.country,
          query: location.lat + ',' + location.lon,
        }));
        setCities(cityList);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message.toLowerCase().includes("canceled")) {
            console.log("Fetch aborted");
          } else {
            console.error(error); // Log other errors
          }
        } else {
          console.error("An unexpected error occurred");
        }
      }
    };

    if (query.length > 2) {
      fetchCities();
    }

    // Clean up function
    return () => {
      abortController.abort();
      setCities([]);
    };
  }, [query]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (index >= 0 && index < cities.length) {
          setQuery('');
          handleSend(cities[index].query);
        }
        break;
      case "ArrowUp":
        setIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "ArrowDown":
        setIndex((prev) => Math.min(prev + 1, cities.length - 1));
        break;
    }
  };
  const todayDay = getTodayDate();
  const prevWeekDate = getPastDate(6);
  const handleSend = async (cityName? : string) => {
    const cityToFetch = cityName || query;
    const cityData = await getWeather(cityToFetch);
    const todaCityData = await getTodayWeather(cityToFetch);
    const prevWeekData = await getWeatherByDate(prevWeekDate,cityToFetch, todayDay);
    const todayDataToStore = {
      location: {
        city: todaCityData.location.name,
        country: todaCityData.location.country,
      },
      tempUnit: 'celsius',
      forecast: todaCityData.forecast.forecastday[0].hour
      .map((item: RootHourItem) => ({
        dt: item.time,
        temp: item.temp_c,
        uvIndex: item.uv,
        windSpeed: item.wind_kph,
        humidity: item.humidity,
        visibility: item.vis_km,
        airQuality: item.air_quality.pm2_5,
        description: item.condition.text,
        rainChance: item.chance_of_rain,
      })),
      astro: {
        sunrise: todaCityData.forecast.forecastday[0].astro.sunrise,
        sunset: todaCityData.forecast.forecastday[0].astro.sunset,
      }
    }
    const dataToStore = {
      location: {
        city: cityData.location.name,
        country: cityData.location.country,
      },
      tempUnit: 'celsius',
      forecast: cityData.forecast.forecastday.map((item: RootItem) => ({
        dt: item.date,
        sunrise: item.astro.sunrise,
        sunset: item.astro.sunset,
        temp: item.day.avgtemp_c,
        uvIndex: item.day.uv,
        windSpeed: item.day.maxwind_kph,
        humidity: item.day.avghumidity,
        visibility: item.day.avgvis_km,
        airQuality: item.day.air_quality.pm2_5,
        description: item.day.condition.text,
        rainChance: item.day.daily_chance_of_rain,
      })),
    };
    const prevWeekDataToStore = {
      forecast: prevWeekData.forecast.forecastday.map((item: RootPrevWeek) => ({
        dt: item.date,
        temp: item.day.avgtemp_c,
        sunrise: item.astro.sunrise,
        sunset: item.astro.sunset,
      }))
    }
    dispatch(setPrevWeekWeatherList(prevWeekDataToStore));
    dispatch(setTodayWeatherList(todayDataToStore));
    dispatch(setWeatherList(dataToStore));
    dispatch(setDate(dataToStore.forecast[0].dt));
    dispatch(setDay(DateToDay(dataToStore.forecast[0].dt)));
    dispatch(setTemp(dataToStore.forecast[0].temp));
    dispatch(setHour(todayDataToStore.forecast[0].dt));
    dispatch(setHourTemp(todayDataToStore.forecast[0].temp));
    setQuery('');
    setCities([]);
  };

  if(!hasRun.current) {
    handleSend('bangalore');
    hasRun.current = true;
  }

  return (
    <div >
      <div className="relative inline-block w-full">
          <input
            className="bg-slate-50 w-full pl-8 py-2 rounded-lg dark:bg-slate-700"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a place ..."
          />
          <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
      </div>
      {cities.length > 0 && (
        <ul className="absolute dark:bg-slate-900 bg-white border border-gray-300 rounded-lg mt-1  max-h-60 overflow-y-auto">
          {cities.map((city: { cityName: string; countryName: string }, i) => (
            <li
              key={i}
              onClick={() => {
                const selectedCity = city.cityName;
                setQuery('');
                handleSend(selectedCity);
              }}
              className={`cursor-pointer hover:bg-gray-100 p-2 rounded-lg ${index === i ? "bg-gray-500" : ""}`}
            >
              {city.cityName}, {city.countryName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
