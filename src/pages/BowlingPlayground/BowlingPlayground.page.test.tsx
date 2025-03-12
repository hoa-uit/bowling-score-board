import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { vi } from 'vitest';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import BowlingPlayground from './BowlingPlayground.page';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('BowlingPlayground Component', () => {
  let setpinNumber, setroundNumber, setScoreList, setPlayerList, setRound, mockNavigate;

  beforeEach(() => {
    setpinNumber = vi.fn();
    setroundNumber = vi.fn();
    setScoreList = vi.fn();
    setPlayerList = vi.fn();
    setRound = vi.fn();
    mockNavigate = vi.fn();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <pinNumberContext.Provider value={{ setpinNumber: setpinNumber }}>
          <roundNumberContext.Provider value={{ setroundNumber: setroundNumber }}>
            <scoreListContext.Provider value={{ setScoreList: setScoreList }}>
              <playerListContext.Provider value={{ playerList: [], setPlayerList: setPlayerList }}>
                <roundContext.Provider value={{ setRound: setRound }}>
                  <BowlingPlayground />
                </roundContext.Provider>
              </playerListContext.Provider>
            </scoreListContext.Provider>
          </roundNumberContext.Provider>
        </pinNumberContext.Provider>
      </MemoryRouter>
    );
  };

  it('Should render the ScoreBoard, ScoreManager, and Restart button', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();
  });

  it('Should call necessary functions and navigates on restart', () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'Restart' }));

    expect(setScoreList).toHaveBeenCalled();
    expect(setroundNumber).toHaveBeenCalledWith(10);
    expect(setpinNumber).toHaveBeenCalledWith(10);
    expect(setRound).toHaveBeenCalledWith(1);
    expect(setPlayerList).toHaveBeenCalledWith(['player 1', 'player 2', 'player 3']);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
