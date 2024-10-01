import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, it, expect, vi } from "vitest";
import weatherReducer from "../../slices/weatherSlice";
import todayWeatherReducer from "../../slices/todayWeatherSlice";
import prevWeekTempReducer from "../../slices/prevWeekTempSlice";
import "@testing-library/jest-dom";
import { type ReactNode } from "react";

import Navbar from "../../components/Navbar";

// Mock initial state for weather slice
// const mockInitialState = {
//   weather: {
//     location: {
//       city: "",
//       country: "",
//     },
//     forecast: [],
//     tempUnit: "celsius",
//   },
//   todayWeather: {
//     location: {
//       city: "",
//       country: "",
//     },
//     forecast: [],
//     tempUnit: "celsius",
//     astro: {
//       sunrise: "0",
//       sunset: "0",
//     },
//   },
//   prevWeekTemp: {
//     forecast: [], // Initialize with an empty array
//     tempUnit: "", // Initialize with an empty string
//   },
// };

// Helper function to render Navbar with Redux
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
 
describe("Navbar Component", () => {
  it("should render Today and Week buttons", () => {
    const setNavMock = vi.fn();
    renderWithRedux(<Navbar setNav={setNavMock} nav="today" />);

    const todayButton = screen.getByText("Today");
    const weekButton = screen.getByText("Week");

    expect(todayButton).toBeInTheDocument();
    expect(weekButton).toBeInTheDocument();
  });

  it('should highlight Today button when "today" is selected', () => {
    const setNavMock = vi.fn();
    renderWithRedux(<Navbar setNav={setNavMock} nav="today" />);

    const todayButton = screen.getByText("Today");
    expect(todayButton).toHaveClass(
      "border-b-2 border-black dark:border-white"
    );
  });

  it('should highlight Week button when "week" is selected', () => {
    const setNavMock = vi.fn();
    renderWithRedux(<Navbar setNav={setNavMock} nav="week" />);

    const weekButton = screen.getByText("Week");
    expect(weekButton).toHaveClass("border-b-2 border-black dark:border-white");
  });

  it("should switch temperature unit to Fahrenheit when °F is clicked", () => {
    const setNavMock = vi.fn();
    renderWithRedux(<Navbar setNav={setNavMock} nav="today" />);

    const fahrenheitButton = screen.getByText("°F");
    fireEvent.click(fahrenheitButton);

    expect(fahrenheitButton).toHaveClass("bg-black text-white");
    const celsiusButton = screen.getByText("°C");
    expect(celsiusButton).toHaveClass("bg-white text-black");
  });

  it("should switch temperature unit to Celsius when °C is clicked", () => {
    const setNavMock = vi.fn();
    renderWithRedux(<Navbar setNav={setNavMock} nav="today" />);

    const celsiusButton = screen.getByText("°C");
    fireEvent.click(celsiusButton);

    expect(celsiusButton).toHaveClass("bg-black text-white");
    const fahrenheitButton = screen.getByText("°F");
    expect(fahrenheitButton).toHaveClass("bg-white text-black");
  });
});
