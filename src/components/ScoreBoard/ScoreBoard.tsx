import { useContext, useEffect } from 'react';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundContext } from '../../contexts/round';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';
import ScoreProcess from '../../utils/scoreProcess';

import './ScoreBoard.css';

const ScoreBoard = () => {
  const { scoreList } = useContext(scoreListContext);
  const { playerList } = useContext(playerListContext);
  const { round } = useContext(roundContext);
  const { roundNumber } = useContext(roundNumberContext);

  useEffect(() => {
    console.log('ScoreList has been updated');
  }, [scoreList, playerList, round]);

  function printPlayerScoreBoard() {
    const players = [];
    for (let i = 0; i < playerList.length; i++) {
      players.push(
        <PLayerSCoreBoards PlayerName={playerList[i]} PlayerSCore={scoreList[i]} round={round} />
      );
    }
    return players;
  }

  return (
    <div className="scoreboard">
      <table className="table table-bordered">
        <thead>
          <tr>
            <td className="mantineText">Player </td>
            <td className="mantineText" colSpan={roundNumber * 2 + 1}>
              Score Tracker Board
            </td>
            <td className="mantineText">Total </td>
          </tr>
        </thead>
        <tbody>
          <tr className="rounds">
            <td className="bg-dark" />
            {TourPrint()}

            <td className="bg-dark" />
          </tr>
          {printPlayerScoreBoard()}
        </tbody>
      </table>
    </div>
  );
};

export function PLayerSCoreBoards(props: any) {
  const PlayerSCore = props.PlayerSCore;
  const PlayerName = props.PlayerName;
  const { pinNumber } = useContext(pinNumberContext);
  const { roundNumber } = useContext(roundNumberContext);

  const Score = PlayerSCore.map((score: any, index: any) => (
    <td className="whiteText" key={index}>
      {score}
    </td>
  ));

  return (
    <tr className="scoreboard">
      <td className="mantineText">{PlayerName}</td>
      {Score}
      <td className="whiteText">{ScoreProcess(PlayerSCore, pinNumber, roundNumber)}</td>
    </tr>
  );
}

const TourPrint = () => {
  const roundNumber = useContext(roundNumberContext);
  const tour = [];
  for (let index = 0; index < roundNumber.roundNumber; index++) {
    if (index !== roundNumber.roundNumber - 1) {
      tour.push(
        <td className="mantineText" colSpan={2}>
          Frame {index + 1}
        </td>
      );
    } else {
      tour.push(
        <td className="mantineText" colSpan={3}>
          Frame {index + 1}
        </td>
      );
    }
  }
  return tour;
};
export default ScoreBoard;
