import { getWeather } from "@/services/apiWeather";
import axios from "axios";
import { vi } from "vitest";

vi.mock('axios');

describe('apiSearchCity get function', () => {
  it('makes a get request', async () => {
        const cityMock = {
            "id": 2801268,
            "name": "London",
            "region": "City of London, Greater London",
            "country": "United Kingdom",
            "lat": 51.52,
            "lon": -0.11,
            "url": "london-city-of-london-greater-london-united-kingdom"
        };
        (axios.get as jest.Mock).mockResolvedValue({ data: [cityMock] });
        const data = await getWeather('London');
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/forecast.json'), expect.any(Object));
        expect(data[0]).toEqual(cityMock);
    })
})
