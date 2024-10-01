import hourAndTempReducer, { setHour, setHourTemp } from '../../slices/hourAndTempSlice';

describe('hourAndTempSlice reducer tests', () => {
  const initialState = {
    hour: '',
    temp: '',
  };

  it('should handle setHour action', () => {
    const nextState = hourAndTempReducer(initialState, setHour('10 AM'));
    expect(nextState.hour).toBe('10 AM');
  });

  it('should handle setHourTemp action', () => {
    const nextState = hourAndTempReducer(initialState, setHourTemp('30°C'));
    expect(nextState.temp).toBe('30°C');
  });
});
