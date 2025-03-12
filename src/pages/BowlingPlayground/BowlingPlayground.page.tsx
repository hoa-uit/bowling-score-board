import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from '@/components/ScoreBoard/ScoreBoard';
import ScoreManager from '@/components/ScoreManager/ScoreManager';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';

import '../../App.css';

const BowlingPlayground = () => {
  const navigate = useNavigate();
  const { setScoreList } = useContext(scoreListContext);
  const { setPlayerList } = useContext(playerListContext);
  const { setRound } = useContext(roundContext);
  const { setpinNumber } = useContext(pinNumberContext);
  const { setroundNumber } = useContext(roundNumberContext);

  const handleOnClick = () => {
    setScoreList([
      [
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
      ],
      [
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
        ' ',
      ],
    ]);

    setroundNumber(10);
    setpinNumber(10);
    setRound(1);
    setPlayerList(['player 1', 'player 2', 'player 3']);
    navigate('/');
  };

  return (
    <div className="Game">
      <ScoreBoard />
      <ScoreManager />
      <button type="button" className="btn btn-light btn-outline-danger" onClick={handleOnClick}>
        Restart
      </button>
    </div>
  );
};

export default BowlingPlayground;
