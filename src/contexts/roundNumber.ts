import React from 'react';

export const roundNumberContext = React.createContext({
  roundNumber: 10,
  setroundNumber: (_roundNumber: number) => {},
});

export default roundNumberContext;
