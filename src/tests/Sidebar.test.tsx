// Sidebar.test.ts
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Sidebar from '../features/Sidebar';
import rootReducer from '../slices/weatherSlice'; // Adjust the import according to your structure
import { vi } from 'vitest';

// Create a mock store
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockStore = (initialState: any) => {
    return createStore(rootReducer, initialState);
};

describe('Sidebar Component', () => {
    test('renders with weather forecast and location', () => {
        const initialState = {
            weather: {
                forecast: [
                    {
                        dt: '2024-09-30',
                        temp: 25.5,
                        description: 'Sunny',
                        rainChance: 20,
                    },
                    {
                        dt: '2024-10-01',
                        temp: 22.0,
                        description: 'Cloudy',
                        rainChance: 10,
                    },
                ],
                location: {
                    city: 'Test City',
                    country: 'Test Country',
                },
                tempUnit: 'celsius',
            },
            dayandtemp: {
                day: 'Sunday', // Adjust this based on your DateToDay function
            },
        };

        const store = createMockStore(initialState);
        const setNavMock = vi.fn();
        render(
            <Provider store={store}>
                <Sidebar setNav={setNavMock} nav="test" />
            </Provider>
        );

        // Assertions to check if elements are rendered as expected
        expect(screen.getByText(/Test City/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Country/i)).toBeInTheDocument();
        expect(screen.getByText(/25.5/i)).toBeInTheDocument(); 
        expect(screen.getByText(/Sunny/i)).toBeInTheDocument();
        expect(screen.getByTestId('my-image')).toBeInTheDocument();
    });
});
