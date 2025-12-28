import { render } from '@testing-library/react';
import LandingPage from '../Home';

describe('Level 1: Component Rendering', () => {

  it('render without crashing', () => {
    const { container } = render(<LandingPage />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('render sections', () => {
    const { container } = render(<LandingPage />);

    expect(container.firstChild).toHaveClass('min-h-screen');
  });
});
