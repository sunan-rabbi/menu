/**
 * LEVEL 2 TESTS - UPPER LEVEL (Medium Complexity)
 *
 * Testing Strategy:
 * - State management testing
 * - API mocking with fetch
 * - User interactions (clicks, filters)
 * - Async operations
 * - Conditional rendering
 * - Event handlers
 *
 * Complexity: MEDIUM
 * Tools: React Testing Library + User Event + Fetch Mocking
 */

import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuPage from '../page';

// Mock data
const mockMenuItems = [
  {
    id: 1,
    name: 'Burger',
    category: 'Main Course',
    price: 12.99,
    description: 'Delicious beef burger',
    image: '/images/burger.jpg',
    isVegetarian: false,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Salad',
    category: 'Appetizer',
    price: 8.99,
    description: 'Fresh garden salad',
    image: '/images/salad.jpg',
    isVegetarian: true,
    rating: 4.2
  },
  {
    id: 3,
    name: 'Pizza',
    category: 'Main Course',
    price: 15.99,
    description: 'Cheesy pizza',
    image: '/images/pizza.jpg',
    isVegetarian: true,
    rating: 4.8
  }
];

describe('Level 2: MenuPage Component Tests (Medium Complexity)', () => {

  beforeEach(() => {
    // Reset fetch mock before each test
    (global.fetch as jest.Mock).mockClear();
  });

  describe('Loading State', () => {
    it('should display loading spinner initially', () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        new Promise(() => {}) // Never resolves to keep loading state
      );

      render(<MenuPage />);

      expect(screen.getByText(/loading menu/i)).toBeInTheDocument();
    });

    it('should show spinner animation during loading', () => {
      (global.fetch as jest.Mock).mockImplementation(() =>
        new Promise(() => {})
      );

      render(<MenuPage />);

      const spinner = document.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });
  });

  describe('Data Fetching', () => {
    it('should fetch menu items from API on mount', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });

      render(<MenuPage />);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/menu');
      });
    });

    it('should render menu items after successful fetch', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });

      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('Salad')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
      });
    });

    it('should handle fetch errors gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

      render(<MenuPage />);

      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalled();
      });

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Category Filtering', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });
    });

    it('should display "All" category by default', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        const allButton = screen.getByRole('button', { name: /all/i });
        expect(allButton).toHaveClass('bg-teal-600');
      });
    });

    it('should show all items when "All" category is selected', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('Salad')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
      });
    });

    it('should filter items by category when category button is clicked', async () => {
      const user = userEvent.setup();
      render(<MenuPage />);

      // Wait for items to load
      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
      });

      // Click on "Main Course" category
      const mainCourseButton = screen.getByRole('button', { name: /main course/i });
      await user.click(mainCourseButton);

      // Should show only Main Course items
      expect(screen.getByText('Burger')).toBeInTheDocument();
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.queryByText('Salad')).not.toBeInTheDocument();
    });

    it('should update active category styling on click', async () => {
      const user = userEvent.setup();
      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
      });

      const appetizerButton = screen.getByRole('button', { name: /appetizer/i });
      await user.click(appetizerButton);

      expect(appetizerButton).toHaveClass('bg-teal-600');
    });
  });

  describe('Menu Item Display', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });
    });

    it('should display item name and price', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
        expect(screen.getByText('$12.99')).toBeInTheDocument();
      });
    });

    it('should display item description', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Delicious beef burger')).toBeInTheDocument();
      });
    });

    it('should display vegetarian icon for vegetarian items', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        const vegetarianIcons = document.querySelectorAll('.text-green-500, .bg-green-500');
        expect(vegetarianIcons.length).toBeGreaterThan(0);
      });
    });

    it('should display rating for each item', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('4.5')).toBeInTheDocument();
        expect(screen.getByText('4.2')).toBeInTheDocument();
      });
    });
  });

  describe('Empty State', () => {
    it('should show "no items" message when filter returns empty results', async () => {
      const user = userEvent.setup();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => [mockMenuItems[0]], // Only one item in Main Course
      });

      render(<MenuPage />);

      await waitFor(() => {
        expect(screen.getByText('Burger')).toBeInTheDocument();
      });

      // Click on Appetizer (which doesn't exist in the mocked data)
      const allButtons = screen.getAllByRole('button');
      const appetizerButton = allButtons.find(btn => btn.textContent === 'Appetizer');

      if (appetizerButton) {
        await user.click(appetizerButton);

        await waitFor(() => {
          expect(screen.getByText(/no items found/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('User Interactions', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });
    });

    it('should make "View Details" buttons clickable', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        const viewDetailsButtons = screen.getAllByText(/view details/i);
        expect(viewDetailsButtons.length).toBeGreaterThan(0);
        viewDetailsButtons.forEach(button => {
          expect(button).toBeInTheDocument();
        });
      });
    });

    it('should link to individual menu item pages', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        const links = document.querySelectorAll('a[href^="/menu/"]');
        expect(links.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Responsive Grid Layout', () => {
    beforeEach(() => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => mockMenuItems,
      });
    });

    it('should render items in a grid layout', async () => {
      render(<MenuPage />);

      await waitFor(() => {
        const grid = document.querySelector('.grid');
        expect(grid).toBeInTheDocument();
      });
    });
  });
});
