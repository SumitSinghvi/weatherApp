import weatherReducer, { setWeatherList, setTempUnitValues } from '../../slices/weatherSlice';

const initialState = {
  location: {
    city: "New York",
    country: "USA",
  },
  forecast: [
    {
      dt: '',
      sunrise: '05:44 AM',
      sunset: '05:44 PM',
      temp: 0,
      uvIndex: 0,
      windSpeed: 0,
      humidity: 0,
      visibility: 0,
      airQuality: 0,
      description: "Sunny",
      rainChance: 0,
    },
  ],
  tempUnit: 'celsius',
};

describe('weatherSlice reducer tests', () => {

  it('should handle setWeatherList action', () => {
    const newWeatherData = {
      location: {
        city: "Los Angeles",
        country: "USA",
      },
      forecast: [
        {
          dt: '2024-10-01',
          sunrise: '06:30 AM',
          sunset: '06:50 PM',
          temp: 25,
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
    };

    const nextState = weatherReducer(initialState, setWeatherList(newWeatherData));
    expect(nextState.location).toEqual(newWeatherData.location);
    expect(nextState.forecast).toEqual(newWeatherData.forecast);
    expect(nextState.tempUnit).toBe('celsius');
  });

  it('should handle setTempUnitValues action (to Fahrenheit)', () => {
    const nextState = weatherReducer(initialState, setTempUnitValues(true)); // true to switch to Fahrenheit

    expect(nextState.tempUnit).toBe('fahrenheit');
    expect(nextState.forecast[0].temp).toBe(32); 
  });

  it('should handle setTempUnitValues action (to Celsius)', () => {
   
    const initialStateInFahrenheit = {
      ...initialState,
      forecast: [
        {
          dt: '2024-10-01',
          sunrise: '06:30 AM',
          sunset: '06:50 PM',
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

    const nextState = weatherReducer(initialStateInFahrenheit, setTempUnitValues(false)); // false to switch to Celsius

    expect(nextState.tempUnit).toBe('celsius');
    expect(nextState.forecast[0].temp).toBeCloseTo(0);
  });
});
