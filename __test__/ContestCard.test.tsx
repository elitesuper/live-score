// ContestCard.test.tsx
import { render, screen } from '@testing-library/react';
import ContestCard from '../components/contestcard';
import { ContestType } from '../interfaces';
import contestData from "../utils/sports.json";

// Mock the 'next/link' module
jest.mock('next/link', () => ({ children }: { children: React.ReactNode }) => children);

describe('ContestCard', () => {
  const mockContest: ContestType = contestData[0] as ContestType;

  it('renders contest card with link', () => {
    render(<ContestCard contest={mockContest} />);

    // Check if the contest card is rendered
    const contestCard = screen.getByTestId('contest-card');
    expect(contestCard).toBeInTheDocument();
    
  });
});
