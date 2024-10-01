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

export interface RootCity {
  name: string;
  country: string;
  lat: string;
  lon: string;
}

export interface RootPrevWeek {
  date: string;
  day: {
    avgtemp_c: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
  };
}

export interface RootCities {
  cityName: string;
  countryName: string;
  query: string;
}

export interface NavbarProps {
  setNav: (nav: string) => void;
  nav: string;
}