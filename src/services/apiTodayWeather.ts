import axios from "axios";

export async function getTodayWeather(q: string, signal?: AbortSignal) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${q}&days=1&aqi=yes`, {
            signal,
        })
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        throw Error (error);
    }
};