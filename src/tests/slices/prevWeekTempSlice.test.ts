import prevWeekTempReducer, { setPrevWeekTempUnitValues, setPrevWeekWeatherList } from '../../slices/prevWeekTempSlice';

const initialState = {
  forecast: [
    {
      dt: '',
      temp: 0,
      sunrise: '05:54 AM',
      sunset: '05:44 PM',
    },
  ],
  tempUnit: 'celsius',
};

describe('prevWeekTempSlice reducer tests', () => {

  it('should handle setPrevWeekWeatherList action', () => {
    const newWeatherList = {
      forecast: [
        {
          dt: '2024-10-01',
          temp: 25,
          sunrise: '06:00 AM',
          sunset: '06:00 PM',
        },
      ],
      tempUnit: 'celsius',
    };

    const nextState = prevWeekTempReducer(initialState, setPrevWeekWeatherList(newWeatherList));
    expect(nextState.forecast).toEqual(newWeatherList.forecast);
    expect(nextState.tempUnit).toBe('celsius');
  });

  it('should handle setPrevWeekTempUnitValues action (to Fahrenheit)', () => {
    const nextState = prevWeekTempReducer(initialState, setPrevWeekTempUnitValues(true)); 

    expect(nextState.tempUnit).toBe('fahrenheit');
    expect(nextState.forecast[0].temp).toBe(32); 
  });

  it('should handle setPrevWeekTempUnitValues action (to Celsius)', () => {
    const initialStateInFahrenheit = {
      forecast: [
        {
          dt: '2024-10-01',
          temp: 32, 
          sunrise: '06:00 AM',
          sunset: '06:00 PM',
        },
      ],
      tempUnit: 'fahrenheit',
    };

    const nextState = prevWeekTempReducer(initialStateInFahrenheit, setPrevWeekTempUnitValues(false)); // false to switch to Celsius

    expect(nextState.tempUnit).toBe('celsius');
    expect(nextState.forecast[0].temp).toBeCloseTo(0); 
  });
});
