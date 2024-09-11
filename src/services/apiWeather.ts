import axios from "axios";

export async function getWeather(q: string, signal?: AbortSignal) {
    try {
        const response = await axios.get(`http://localhost:5000/?location=${q}`, {
            signal,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        })
        return response.data;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        throw Error (error);
    }
}