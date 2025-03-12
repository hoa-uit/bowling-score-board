import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import ScoreBoard from './ScoreBoard';

vi.mock('../../utils/scoreProcess', () => ({
  default: vi.fn(() => 100),
}));

describe('ScoreBoard Component', () => {
  let scoreList, playerList, round, roundNumber, pinNumber;

  beforeEach(() => {
    scoreList = [
      ['X', ' ', ' '],
      [' ', '5', '/'],
    ];
    playerList = ['Player 1', 'Player 2'];
    round = 2;
    roundNumber = 10;
    pinNumber = 10;
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <pinNumberContext.Provider value={{ pinNumber }}>
          <roundNumberContext.Provider value={{ roundNumber }}>
            <scoreListContext.Provider value={{ scoreList }}>
              <playerListContext.Provider value={{ playerList }}>
                <roundContext.Provider value={{ round }}>
                  <ScoreBoard />
                </roundContext.Provider>
              </playerListContext.Provider>
            </scoreListContext.Provider>
          </roundNumberContext.Provider>
        </pinNumberContext.Provider>
      </MemoryRouter>
    );
  };

  it('renders the scoreboard table structure', () => {
    renderComponent();
    expect(screen.getByText('Score Tracker Board')).toBeInTheDocument();
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('displays player names and scores correctly', () => {
    renderComponent();
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
    expect(screen.getByText('X')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('displays total score correctly using ScoreProcess function', () => {
    renderComponent();
    expect(screen.getAllByText('100')).toHaveLength(2);
  });
});
