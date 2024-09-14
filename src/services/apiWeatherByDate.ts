import axios from "axios";

export async function getWeatherByDate(date: string, query: string, signal?: AbortSignal) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&dt=${date}&days=7&aqi=yes`, {
            signal,
        })
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        throw Error (error);
    }
};