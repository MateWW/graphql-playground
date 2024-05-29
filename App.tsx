import { SafeAreaView } from 'react-native';
import { TestingScreen } from './TestingScreen';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});


export default function App() {
  return (
    <SafeAreaView>
      <ApolloProvider client={client}>
        <TestingScreen/>
      </ApolloProvider>
    </SafeAreaView>
  );
}
