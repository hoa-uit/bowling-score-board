import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { useState } from 'react';
import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { MantineProvider } from '@mantine/core';
import { pinNumberContext } from './contexts/pinNumber';
import { playerListContext } from './contexts/playerlist';
import { roundContext } from './contexts/round';
import { roundNumberContext } from './contexts/roundNumber';
import { scoreListContext } from './contexts/scorelist';
import { Router } from './routes/Router';
import { theme } from './theme';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default function App() {
  const [scoreList, setScoreList] = useState([
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
  const [round, setRound] = useState(1);
  const [pinNumber, setpinNumber] = useState(10);
  const [roundNumber, setroundNumber] = useState(10);
  const [playerList, setPlayerList] = useState(['player 1', 'player 2', 'player 3']);

  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <playerListContext.Provider value={{ playerList, setPlayerList }}>
          <pinNumberContext.Provider value={{ pinNumber, setpinNumber }}>
            <roundContext.Provider value={{ round, setRound }}>
              <roundNumberContext.Provider value={{ roundNumber, setroundNumber }}>
                <scoreListContext.Provider value={{ scoreList, setScoreList }}>
                  <Router />
                </scoreListContext.Provider>
              </roundNumberContext.Provider>
            </roundContext.Provider>
          </pinNumberContext.Provider>
        </playerListContext.Provider>
      </MantineProvider>
    </ApolloProvider>
  );
}
