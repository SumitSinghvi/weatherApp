import axios from "axios";

export async function searchCity(q: string, signal?: AbortSignal) {
    try {
        const response = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${q}`, {
            signal,
        })
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        throw Error (error);
    }
}
