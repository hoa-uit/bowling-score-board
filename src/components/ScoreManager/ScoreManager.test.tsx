import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import ScoreManager from './ScoreManager';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('ScoreManager Component', () => {
  let setpinNumber, setroundNumber, setScoreList, setPlayerList, setRound, mockNavigate;
  let scoreList, playerList, round, pinNumber, roundNumber;

  beforeEach(() => {
    setpinNumber = vi.fn();
    setroundNumber = vi.fn();
    setScoreList = vi.fn();
    setPlayerList = vi.fn();
    setRound = vi.fn();
    mockNavigate = vi.fn();

    scoreList = [
      [' ', ' '],
      [' ', ' '],
    ];
    playerList = ['player 1', 'player 2'];
    round = 1;
    pinNumber = 10;
    roundNumber = 10;

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <pinNumberContext.Provider value={{ pinNumber }}>
          <roundNumberContext.Provider value={{ roundNumber }}>
            <scoreListContext.Provider value={{ scoreList, setScoreList }}>
              <playerListContext.Provider value={{ playerList }}>
                <roundContext.Provider value={{ round, setRound }}>
                  <ScoreManager />
                </roundContext.Provider>
              </playerListContext.Provider>
            </scoreListContext.Provider>
          </roundNumberContext.Provider>
        </pinNumberContext.Provider>
      </MemoryRouter>
    );
  };

  it('Should render player turn information and input field', () => {
    renderComponent();

    expect(screen.getByText(/player 1 's turn/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Number of knocked pins')).toBeInTheDocument();
  });

  // it('Should update score and moves to next player', () => {
  //   renderComponent();

  //   const input = screen.getByPlaceholderText('Number of knocked pins');
  //   fireEvent.change(input, { target: { value: '5' } });
  //   fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  //   expect(setScoreList).toHaveBeenCalled();
  //   expect(setRound).toHaveBeenCalledTimes(1);
  // });

  // it('Should alert if the score is incorrect', () => {
  //   renderComponent();

  //   fireEvent.change(screen.getByPlaceholderText('Number of knocked pins'), {
  //     target: { value: '20' },
  //   });
  //   fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  //   expect(window.alert).toHaveBeenCalledWith('Score incorrect');
  // });

  // it('Should navigate to end-game when the game ends', () => {
  //   renderComponent();

  //   const input = screen.getByPlaceholderText('Number of knocked pins');

  //   // Simulate a full game completion
  //   for (let i = 0; i < 20; i++) {
  //     fireEvent.change(input, { target: { value: '10' } });
  //     fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  //   }

  //   expect(mockNavigate).toHaveBeenCalledWith('/end-game');
  // });
});
