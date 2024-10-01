import { render, screen } from '@testing-library/react';
import HighlightCard from '../../components/HighlightCard'; // Adjust the import path as necessary

describe('HighlightCard', () => {
  test('renders HighlightCard with children', () => {
    render(
      <HighlightCard>
        <div>Card Content</div>
      </HighlightCard>
    );

    expect(screen.getByText(/Card Content/i)).toBeInTheDocument();
  });

  test('renders HighlightCard.Head with children', () => {
    render(
      <HighlightCard.Head>
        <h1>Card Head</h1>
      </HighlightCard.Head>
    );

    expect(screen.getByText(/Card Head/i)).toBeInTheDocument();
  });

  test('renders HighlightCard.Middle with children and unit', () => {
    render(
      <HighlightCard.Middle unit="°C" loc="top">
        <span>25</span>
      </HighlightCard.Middle>
    );

    expect(screen.getByText(/25/i)).toBeInTheDocument();
    expect(screen.getByText(/°C/i)).toHaveClass('font-semibold text-lg mb-auto');
  });

  test('renders HighlightCard.Bottom with children', () => {
    render(
      <HighlightCard.Bottom>
        <p>Card Bottom Content</p>
      </HighlightCard.Bottom>
    );

    expect(screen.getByText(/Card Bottom Content/i)).toBeInTheDocument();
  });

  test('renders HighlightCard.Unit with children', () => {
    render(
      <HighlightCard.Unit>
        <span>Unit Content</span>
      </HighlightCard.Unit>
    );
    expect(screen.getByText(/Unit Content/i)).toBeInTheDocument();
  });
});
