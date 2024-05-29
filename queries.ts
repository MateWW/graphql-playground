import { gql } from "@apollo/client"

export const Country = gql`
query GetCountry($country: ID!) {
    country(code: $country) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`

export const ListCountries = gql`
  query ListCountriesThatUseUSD(
    $currency: String!
  ) {
    countries(filter: { currency: { eq: $currency } }) {
      code
      name
    }
  }
`