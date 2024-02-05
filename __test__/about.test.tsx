import { render, screen } from '@testing-library/react';
import About from '@/pages/about'; // Update with the correct path

test('renders About component', () => {
  render (<About />)

  // Check if the title and link are rendered
  expect(screen.getByText(/about page/i)).toBeInTheDocument();
  expect(screen.getByText(/go back/i)).toBeInTheDocument();

  // Optionally, you can add more specific assertions based on your component structure.
  // For example, you might want to check if the Link component has the correct href attribute.
});
