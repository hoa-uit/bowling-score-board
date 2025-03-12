import React from 'react';

export const pinNumberContext = React.createContext({
  pinNumber: 10,
  setpinNumber: (_pinNumber: number) => {},
});

export default pinNumberContext;
