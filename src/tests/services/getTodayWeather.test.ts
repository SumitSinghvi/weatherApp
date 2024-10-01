
import { getTodayWeather } from "@/services/apiTodayWeather";
import axios from "axios";
import { vi } from "vitest";

vi.mock('axios');

describe('apiSearchCity get function', () => {
  it('makes a get request', async () => {
        const cityMock = {
            "name": "London",
            "region": "City of London, Greater London",
            "country": "United Kingdom",
            "lat": 51.52,
            "lon": -0.11,
        };
        (axios.get as jest.Mock).mockResolvedValue({ data: [cityMock] });
        const data = await getTodayWeather('London');
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/forecast.json'), expect.any(Object));
        expect(data[0]).toEqual(cityMock);
    })
})
