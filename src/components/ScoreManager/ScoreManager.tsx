/* eslint-disable no-alert */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';

import './ScoreManager.css';

const ScoreManager = () => {
  const navigate = useNavigate();
  const { scoreList, setScoreList } = useContext(scoreListContext);
  const { playerList } = useContext(playerListContext);
  const { round, setRound } = useContext(roundContext);
  const [lance, setLance] = React.useState(0);
  const [player, setPlayer] = React.useState(0);
  const { pinNumber } = useContext(pinNumberContext);
  const { roundNumber } = useContext(roundNumberContext);

  useEffect(() => {
    console.log('Round has been updated');
  }, [round]);

  const updateScore = (player: number, lance: number, score: number) => {
    const newScoreList = [...scoreList];
    if (
      score === pinNumber &&
      (lance % 2 === 0 ||
        (round === roundNumber &&
          (lance % 3 === 0 ||
            (lance % 3 === 1 && newScoreList[player][lance - 1] === 'X') ||
            (lance % 3 === 2 &&
              (newScoreList[player][lance - 1] === 'X' ||
                newScoreList[player][lance - 1] === '/' ||
                newScoreList[player][lance - 2] === 'X')))))
    ) {
      newScoreList[player][lance] = 'X';
    } else if (score + +scoreList[player][lance - 1] === pinNumber && lance % 2 === 1) {
      newScoreList[player][lance] = '/';
    } else {
      newScoreList[player][lance] = score.toString();
    }
    setScoreList(newScoreList);
    console.log(scoreList);
  };

  const handleOnSubmit = () => {
    const score = document.getElementById('pins') as HTMLSelectElement;
    const scoreValue = parseInt(score.value, 10);
    score.value = '';
    const numlance = 2 * round - 2 + lance;

    if (Number.isNaN(scoreValue)) {
      alert('Number of pin is not correct');
    } else if (
      (round < roundNumber &&
        lance === 1 &&
        scoreValue + +scoreList[player][numlance - 1] <= pinNumber) ||
      round === roundNumber ||
      lance === 0
    ) {
      updateScore(player, numlance, scoreValue);

      if (round < roundNumber) {
        if (scoreValue === pinNumber && lance === 0) {
          setLance(0);
          if (player === playerList.length - 1) {
            setRound(round + 1);
          }
        } else {
          setLance((lance + 1) % playerList.length);
        }
        if (player === playerList.length - 1 && lance === 1) {
          setRound(round + 1);
        }
        if (lance === 1 || (lance === 0 && scoreValue === pinNumber)) {
          setPlayer((player + 1) % playerList.length);
          setLance(0);
        }
      } else {
        if (lance === 2 && player === playerList.length - 1) {
          document.getElementById('pins')?.remove();
          document.getElementById('pinsupdate')?.remove();
          setLance(0);
          navigate('/end-game');
        } else if (lance === 2) {
          setPlayer((player + 1) % playerList.length);
          setLance(0);
        }

        if (
          (lance === 1 && scoreList[player][numlance - 1] === 'X') ||
          scoreList[player][numlance] === '/'
        ) {
          setLance(2);
        } else if (lance === 1 && player === playerList.length - 1) {
          document.getElementById('pins')?.remove();
          document.getElementById('pinsupdate')?.remove();
          navigate('/end-game');
          setLance(0);
        } else if (lance === 1) {
          setPlayer((player + 1) % playerList.length);
          setLance(0);
        } else if (lance !== 2) {
          setLance((lance + 1) % 2);
        }
      }
    } else {
      alert('Score incorrect');
    }
  };

  return (
    <div className="scoreManager col-4 mx-auto">
      <div className="score-info">
        <div>{playerList[player]} 's turn</div>
        <div>
          Frame: {round} | Roll: {lance + 1}
        </div>
      </div>

      <div className="input-group mb-3 mt-3">
        <input
          type="number"
          className="form-control"
          placeholder="Number of knocked pins"
          id="pins"
          min="0"
          max={pinNumber}
          onKeyUp={() => {
            const score = document.getElementById('pins') as HTMLSelectElement;
            score.value = score.value.replace(/[^0-9]/g, '');
            const scoreValue = parseInt(score.value, 10);
            if (scoreValue > pinNumber) {
              score.value = String(pinNumber);
            }
          }}
        />
      </div>
      <button
        type="button"
        className="btn btn-light btn-outline-dark mb-3"
        id="pinsupdate"
        onClick={handleOnSubmit}
      >
        Submit
      </button>
    </div>
  );
};
export default ScoreManager;
