import { gql } from '@apollo/client';

// 1) Запрос списка стран
export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

// 2) Запрос одной страны (для страницы /[code])
export const GET_COUNTRY = gql`
  query GetCountry($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
    }
  }
`;
