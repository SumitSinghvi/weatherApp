import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Searchbar from '../../components/Searchbar';
import { ReactNode } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../../slices/weatherSlice';
import todayWeatherReducer from '../../slices/todayWeatherSlice';
import prevWeekTempReducer from '../../slices/prevWeekTempSlice';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';

// interface RootCities {
//   cityName: string;
//   countryName: string;
//   query: string;
// }

const renderWithRedux = (
  component: ReactNode,
  store = configureStore({
    reducer: {
      weather: weatherReducer,
      todayWeather: todayWeatherReducer,
      prevWeekTemp: prevWeekTempReducer,
    },
    // preloadedState: mockInitialState,
  })
) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('Searchbar Component', () => {
  it('renders Searchbar', () => {
    renderWithRedux(<Searchbar />);
    expect(screen.getByPlaceholderText('Search for a place ...')).toBeInTheDocument();
  });
  it('renders cities suggestions', async () => {
    renderWithRedux(<Searchbar />);
    const inputElement = screen.getByPlaceholderText('Search for a place ...');
    fireEvent.change(inputElement, { target: { value: 'Lon' } });
    await waitFor(() => {
      expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
    });
  })
});
