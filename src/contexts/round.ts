import React from 'react';

export const roundContext = React.createContext({
  round: 1,
  setRound: (_round: number) => {},
});

export default roundContext;
