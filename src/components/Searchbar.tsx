import { type FormEvent, type KeyboardEvent, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getWeather } from "../services/apiWeather";
import { setWeatherList } from "../slices/weatherSlice";
import { useDispatch } from "react-redux";
import { DateToDay } from "../utils/DateToDay";
import { setDay, setTemp } from "../slices/dayAndTempSlice";
import { searchCity } from "../services/apiSearchCity";

interface RootItem {
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

interface RootCity {
  name: string;
  country: string;
  lat: string;
  lon: string;
}

interface RootCities {
  cityName: string;
  countryName: string;
  query: string;
}

export default function Searchbar() {
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

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSend();
  };

  const handleSend = async (cityName? : string) => {
    const cityToFetch = cityName || query;
    const cityData = await getWeather(cityToFetch);
    const dataToStore = {
      location: {
        city: cityData.location.name,
        country: cityData.location.country,
      },
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
    dispatch(setWeatherList(dataToStore));
    dispatch(setDay(DateToDay(dataToStore.forecast[0].dt)));
    dispatch(setTemp(dataToStore.forecast[0].temp));
  };

  return (
    <div>
      <div className="relative inline-block w-full">
        <form onSubmit={handleSubmit} className="">
          <input
            className="bg-gray-50 w-full pl-8 py-2 rounded-lg"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a place ..."
          />
          <FaSearch className="absolute left-2 top-1/2 -translate-y-1/2" />
        </form>
      </div>
      {cities.length > 0 && (
        <ul>
          {cities.map((city: { cityName: string; countryName: string }, i) => (
            <li
              key={i}
              onClick={() => {
                const selectedCity = city.cityName;
                setQuery('');
                handleSend(selectedCity);
              }}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
              style={{ background: index === i ? "lightgray" : "transparent" }}
            >
              {city.cityName}, {city.countryName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
