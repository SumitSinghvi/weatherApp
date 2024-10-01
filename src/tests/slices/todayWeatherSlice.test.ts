import todayWeatherReducer, { setTodayWeatherList, setTodayTempUnitValues } from '../../slices/todayWeatherSlice';

const initialState = {
  location: {
    city: "",
    country: "",
  },
  forecast: [
    {
      dt: '',
      temp: 0,
      uvIndex: 0,
      windSpeed: 0,
      humidity: 0,
      visibility: 0,
      airQuality: 0,
      description: "",
      rainChance: 0,
    },
  ],
  tempUnit: 'celsius',
  astro: {
    sunrise: '0',
    sunset: '0',
  }
};

describe('todayWeatherSlice reducer tests', () => {

  it('should handle setTodayWeatherList action', () => {
    const newWeatherData = {
      location: {
        city: "New York",
        country: "USA",
      },
      forecast: [
        {
          dt: '2024-10-01',
          temp: 20,
          uvIndex: 5,
          windSpeed: 10,
          humidity: 50,
          visibility: 10000,
          airQuality: 3,
          description: "Partly cloudy",
          rainChance: 20,
        },
      ],
      tempUnit: 'celsius',
      astro: {
        sunrise: '06:30 AM',
        sunset: '06:50 PM',
      }
    };

    const nextState = todayWeatherReducer(initialState, setTodayWeatherList(newWeatherData));
    expect(nextState.location).toEqual(newWeatherData.location);
    expect(nextState.forecast).toEqual(newWeatherData.forecast);
    expect(nextState.astro).toEqual(newWeatherData.astro);
    expect(nextState.tempUnit).toBe('celsius');
  });

  it('should handle setTodayTempUnitValues action (to Fahrenheit)', () => {
    const nextState = todayWeatherReducer(initialState, setTodayTempUnitValues(true)); // true to switch to Fahrenheit

    expect(nextState.tempUnit).toBe('fahrenheit');
    expect(nextState.forecast[0].temp).toBe(32);
  });

  it('should handle setTodayTempUnitValues action (to Celsius)', () => {
    
    const initialStateInFahrenheit = {
      ...initialState,
      forecast: [
        {
          dt: '2024-10-01',
          temp: 32, 
          uvIndex: 5,
          windSpeed: 10,
          humidity: 50,
          visibility: 10000,
          airQuality: 3,
          description: "Partly cloudy",
          rainChance: 20,
        },
      ],
      tempUnit: 'fahrenheit',
    };

    const nextState = todayWeatherReducer(initialStateInFahrenheit, setTodayTempUnitValues(false));

    expect(nextState.tempUnit).toBe('celsius');
    expect(nextState.forecast[0].temp).toBeCloseTo(0);
  });
});
