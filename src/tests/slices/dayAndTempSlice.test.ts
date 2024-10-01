import dayAndTempReducer, { setDay, setTemp, setDate } from '../../slices/dayAndTempSlice';

describe('dayAndTempSlice reducer tests', () => {
  const initialState = {
    day: '',
    temp: '',
    date: '',
  };
  it('should handle setDay action', () => {
    const nextState = dayAndTempReducer(initialState, setDay('Monday'));
    expect(nextState.day).toBe('Monday');
  });

  it('should handle setTemp action', () => {
    const nextState = dayAndTempReducer(initialState, setTemp('25°C'));
    expect(nextState.temp).toBe('25°C');
  });

  it('should handle setDate action', () => {
    const nextState = dayAndTempReducer(initialState, setDate('2024-10-01'));
    expect(nextState.date).toBe('2024-10-01');
  });
});
