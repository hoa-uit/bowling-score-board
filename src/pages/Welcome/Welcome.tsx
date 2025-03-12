import { useContext, useState } from 'react';

import './Welcome.css';

import { useNavigate } from 'react-router-dom';
import { pinNumberContext } from '../../contexts/pinNumber';
import { playerListContext } from '../../contexts/playerlist';
import { roundNumberContext } from '../../contexts/roundNumber';
import { scoreListContext } from '../../contexts/scorelist';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

function Input({ value, onChange, placeholder }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
    />
  );
}

interface ButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

function Button({ onClick, disabled, children }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="button">
      {children}
    </button>
  );
}

export function Welcome() {
  const [players, setPlayers] = useState(['', '', '', '', '']);
  const [gameReady, setGameReady] = useState(false);
  const navigate = useNavigate();

  const { setpinNumber } = useContext(pinNumberContext);
  const { setroundNumber } = useContext(roundNumberContext);
  const { setScoreList } = useContext(scoreListContext);

  const { playerList, setPlayerList } = useContext(playerListContext);

  const handleChange = (index: number, value: string) => {
    const newPlayers = [...players];
    newPlayers[index] = value;
    setPlayers(newPlayers);

    setGameReady(newPlayers.some((name) => name.trim() !== ''));
  };

  const startGame = () => {
    if (gameReady) {
      const playerNames = players.filter((name) => name.trim() !== '');
      localStorage.setItem('playerNames', JSON.stringify(playerNames));
      setPlayerList(playerNames);
      setpinNumber(10);
      setroundNumber(10);
      const newScoreList = [];

      for (let i = 0; i < playerNames.length; i++) {
        newScoreList.push([
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
        ]);
      }
      setScoreList(newScoreList);
      console.log('Player names saved:', playerNames);
      console.log('playerList context saved:', playerList);

      navigate('/bowling-playground');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Bowling Score Tracker</h1>
        <p className="subtitle">Enter player names (up to 5) to start the game.</p>
        <div className="input-group">
          {players.map((name, index) => (
            <Input
              key={index}
              value={name}
              placeholder={`Player ${index + 1} Name`}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <Button onClick={startGame} disabled={!gameReady}>
          Start Game
        </Button>
      </div>
    </div>
  );
}
