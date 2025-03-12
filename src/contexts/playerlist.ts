import React from 'react';

export const playerListContext = React.createContext({
  playerList: ['Player 1', 'Player 2'],
  setPlayerList: (_playerList: string[]) => {},
});

export default playerListContext;
