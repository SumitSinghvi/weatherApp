import { getWeatherByDate } from "@/services/apiWeatherByDate";
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
            "url": "london-city-of-london-greater-london-united-kingdom"
        };
        (axios.get as jest.Mock).mockResolvedValue({ data: [cityMock] });
        const data = await getWeatherByDate('01/01/2020' ,'London', '08/01/2020');
        expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/history.json'), expect.any(Object));
        expect(data[0]).toEqual(cityMock);
    })
})
