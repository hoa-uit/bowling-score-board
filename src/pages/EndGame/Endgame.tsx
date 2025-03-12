import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from '@/components/ScoreBoard/ScoreBoard';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import scoreProcess from '../../utils/scoreProcess';

const EndGame = () => {
  const { pinNumber, setpinNumber } = useContext(pinNumberContext);
  const { roundNumber, setroundNumber } = useContext(roundNumberContext);
  const { setRound } = useContext(roundContext);

  const navigate = useNavigate();
  const classement = [];
  const { scoreList, setScoreList } = React.useContext(scoreListContext);
  const { playerList, setPlayerList } = React.useContext(playerListContext);
  for (let index = 0; index < playerList.length; index++) {
    classement[index] = [playerList[index], scoreProcess(scoreList[index], pinNumber, roundNumber)];
  }
  classement.sort((a, b) => +b[1] - +a[1]);

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
    <div>
      <h1>Finish</h1>

      <ScoreBoard />
      <div>
        <h2>Ranking</h2>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {classement.map((player, index) => (
              <tr key={index}>
                <td>{player[0]}</td>
                <td>{player[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        className="btn btn-light btn-outline-primary mt-3"
        onClick={handleOnClick}
      >
        Restart
      </button>
    </div>
  );
};

export default EndGame;
