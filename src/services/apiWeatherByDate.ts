import axios from "axios";

export async function getWeatherByDate(date: string, query: string, endDate: string, signal?: AbortSignal) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/history.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${query}&dt=${date}&end_dt=${endDate}&aqi=yes`, {
            signal,
        })
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        throw Error (error);
    }
};