import React, { useEffect, useRef, useState } from 'react';
import { View, Button, Text } from 'react-native';

import { useQuery } from '@apollo/client';

import { Country, ListCountries } from './queries';

export type SpotlightScreenProps = NativeStackScreenProps<
  InsightsScreenParamsList,
  typeof ROUTE
>;
export type SpotlightScreenRoute = RouteProp<
  InsightsScreenParamsList,
  typeof ROUTE
>;
export type SpotlightScreenNavigation = NativeStackNavigationProp<
  InsightsScreenParamsList,
  typeof ROUTE
>;



const queries = [
  {
    query: Country,
    variables: {
      country: 'PL'
    }
  },
  {
    query: Country,
    variables: {
      country: 'UK'
    }
  },
  {
    query: Country,
    variables: {
      country: 'BR'
    }
  },
  {
    query: Country,
    variables: {
      country: 'SCV'
    }
  },
  {
    query: ListCountries,
    variables: {
      currency: 'USD'
    }
  },
  {
    query: ListCountries,
    variables: {
      currency: 'GBP'
    }
  }
];

function getQueryStatus(data) {
  return '123'
}

function isEqual(a, b) {
  const equal = getQueryStatus(a) === getQueryStatus(b);
  return (
    <Text style={{ color: equal ? 'green' : 'red', fontWeight: '700' }}>
      {equal ? 'EQUAL' : 'NOT-EQUAL'}
    </Text>
  );
}

// Insights/SpendingGroups
export const TestingScreen = () => {
  const [skip, setSkip] = useState(false);
  const [querySettings, setQuerySettings] = useState({
    a: queries[0],
    b: queries[1],
    c: queries[2]
  });

  const resultB = useQuery(querySettings?.b.query, {
    skip,
    client: getCoreGraphQLClient(),
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    variables: querySettings?.b.variables
  });
  const resultA = useQuery(querySettings?.a.query, {
    skip,
    client: getCoreGraphQLClient(),
    fetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: querySettings?.a.variables
  });
  const resultC = useQuery(querySettings?.c.query, {
    skip,
    client: getCoreGraphQLClient(),
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    errorPolicy: 'all',
    variables: querySettings?.c.variables
  });

  const setVariables = querySetting => {
    previous.current = {
      a:
        resultA.variables === querySetting.a.variables
          ? previous.current.a
          : resultA.data,
      b:
        resultB.variables === querySetting.b.variables
          ? previous.current.b
          : resultB.data,
      c:
        resultC.variables === querySetting.c.variables
          ? previous.current.c
          : resultC.data
    };
    setQuerySettings(querySetting);
  };

  console.log({
    resultA: resultA.data,
    previousResultA: resultA.previousData,
    resultB: resultB.data,
    previousResultB: resultB.previousData,
    resultC: resultC.data,
    previousResultC: resultC.previousData
  });

  return (
    <>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="S 1"
          onPress={() =>
            setVariables({
              a: queries[0],
              b: queries[1],
              c: queries[2]
            })
          }
        />
        <Button
          title="S 2"
          onPress={() =>
            setVariables({
              a: queries[2],
              b: queries[3],
              c: queries[1]
            })
          }
        />
        <Button
          title="S 3"
          onPress={() =>
            setVariables({
              a: queries[2],
              b: queries[2],
              c: queries[2]
            })
          }
        />
        <Button
          title="S 4"
          onPress={() =>
            setVariables({
              a: queries[3],
              b: queries[3],
              c: queries[3]
            })
          }
        />
        <Button
          title="S 5"
          onPress={() =>
            setVariables({
              a: queries[1],
              b: queries[1],
              c: queries[1]
            })
          }
        />
        <Button
          title="S 6"
          onPress={() =>
            setVariables({
              a: queries[1],
              b: queries[4],
              c: queries[2]
            })
          }
        />
        <Button
          title="S 7"
          onPress={() =>
            setVariables({
              a: queries[4],
              b: queries[1],
              c: queries[2]
            })
          }
        />
        <Button title="Toggle skip" onPress={() => setSkip(skip => !skip)} />
      </View>
      <Text>Result 1:</Text>
      <Text>Loading: {JSON.stringify(resultA.loading)}</Text>
      <Text>PreviousData: {getQueryStatus(resultA.previousData)}</Text>
      <Text>
        Expected PreviousData: {getQueryStatus(previous.current.a)}{' '}
        {isEqual(resultA.previousData, previous.current.a)}
      </Text>
      <Text>Data: {getQueryStatus(resultA.data)}</Text>

      <Text>Result 2: </Text>
      <Text>Loading: {JSON.stringify(resultB.loading)}</Text>
      <Text>PreviousData: {getQueryStatus(resultB.previousData)}</Text>
      <Text>
        Expected PreviousData: {getQueryStatus(previous.current.b)}{' '}
        {isEqual(resultB.previousData, previous.current.b)}
      </Text>
      <Text>Data: {getQueryStatus(resultB.data)}</Text>

      <Text>Result 3: </Text>
      <Text>Loading: {JSON.stringify(resultC.loading)}</Text>
      <Text>PreviousData: {getQueryStatus(resultC.previousData)}</Text>
      <Text>
        Expected PreviousData: {getQueryStatus(previous.current.c)}{' '}
        {isEqual(resultC.previousData, previous.current.c)}
      </Text>
      <Text>Data: {getQueryStatus(resultC.data)}</Text>
    </>
  );
};
