import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import { Welcome } from './Welcome';

// Correctly mock only useNavigate, keeping other exports intact
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Welcome Component', () => {
  let setpinNumber, setroundNumber, setScoreList, setPlayerList, mockNavigate;

  beforeEach(() => {
    setpinNumber = vi.fn();
    setroundNumber = vi.fn();
    setScoreList = vi.fn();
    setPlayerList = vi.fn();
    mockNavigate = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <pinNumberContext.Provider value={{ setpinNumber }}>
          <roundNumberContext.Provider value={{ setroundNumber }}>
            <scoreListContext.Provider value={{ setScoreList }}>
              <playerListContext.Provider value={{ playerList: [], setPlayerList }}>
                <Welcome />
              </playerListContext.Provider>
            </scoreListContext.Provider>
          </roundNumberContext.Provider>
        </pinNumberContext.Provider>
      </MemoryRouter>
    );
  };

  it('Should render the input fields and start button when open Welcome page', () => {
    renderComponent();

    expect(screen.getByText('Bowling Score Tracker')).toBeInTheDocument();
    expect(screen.getByText('Enter player names (up to 5) to start the game.')).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText(/Player \d Name/)).toHaveLength(5);
    expect(screen.getByRole('button', { name: 'Start Game' })).toBeInTheDocument();
  });

  it('Should update input values when typing', () => {
    renderComponent();

    const input = screen.getAllByPlaceholderText('Player 1 Name')[0];
    fireEvent.change(input, { target: { value: 'John' } });
    expect(input).toHaveValue('John');
  });

  it('Should enable the start button when a player name is entered', () => {
    renderComponent();

    const startButton = screen.getByRole('button', { name: 'Start Game' });
    expect(startButton).toBeDisabled();

    fireEvent.change(screen.getAllByPlaceholderText('Player 1 Name')[0], {
      target: { value: 'John' },
    });

    expect(startButton).toBeEnabled();
  });

  it('Should call necessary functions and navigates on game start', () => {
    renderComponent();

    fireEvent.change(screen.getAllByPlaceholderText('Player 1 Name')[0], {
      target: { value: 'John' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }));

    expect(setPlayerList).toHaveBeenCalledWith(['John']);
    expect(setpinNumber).toHaveBeenCalledWith(10);
    expect(setroundNumber).toHaveBeenCalledWith(10);
    expect(setScoreList).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/bowling-playground');
  });
});
