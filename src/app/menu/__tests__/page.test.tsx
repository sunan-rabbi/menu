import { render, screen, waitFor } from '@testing-library/react';
import MenuPage from '../page';
import { mockMenuItems } from '@/src/data/const';

describe('Level 2:Data Fetching', () => {

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('menu items after fetch', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockMenuItems,
    });

    render(<MenuPage />);

    await waitFor(() => {
      expect(screen.getByText('Burger')).toBeInTheDocument();
      expect(screen.getByText('Salad')).toBeInTheDocument();
    });
  });
});
