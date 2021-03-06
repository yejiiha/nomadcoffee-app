import { gql } from "@apollo/client";
import { COFFEESHOP_FRAGMENT, USER_FRAGMENT } from "./Fragment";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $name: String!
    $location: String!
    $password: String!
    $avatarUrl: String
    $githubUsername: String!
  ) {
    createAccount(
      username: $username
      email: $email
      name: $name
      location: $location
      password: $password
      avatarUrl: $avatarUrl
      githubUsername: $githubUsername
    ) {
      ok
      error
    }
  }
`;

export const SEE_COFFEE_SHOPS = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      ...CoffeeShopFragment
      user {
        ...UserFragment
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
  ${COFFEESHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const CREATE_COFFEE_SHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String
    $longitude: String
    $categories: String
    $photos: Upload
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
    }
  }
`;

export const SEE_COFFEE_SHOP = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      ...CoffeeShopFragment
      user {
        ...UserFragment
      }
      photos {
        id
        url
      }
      categories {
        id
        name
      }
    }
  }
  ${COFFEESHOP_FRAGMENT}
  ${USER_FRAGMENT}
`;

export const EDIT_COFFEE_SHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $categories: String
    $photos: Upload
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      categories: $categories
      photos: $photos
    ) {
      id
      ok
      error
    }
  }
`;

export const DELETE_COFFEE_SHOP_MUTATION = gql`
  mutation deleteCoffeeShop($id: Int!) {
    deleteCoffeeShop(id: $id) {
      id
      ok
      error
    }
  }
`;

export const SEE_ME = gql`
  query me {
    me {
      id
      username
      avatarUrl
    }
  }
`;

export const SEARCH_USERS = gql`
  query searchUsers($keyword: String!) {
    searchUsers(keyword: $keyword) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const SEE_PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const SEARCH_COFFEE_SHOPTS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      ...CoffeeShopFragment
    }
  }
  ${COFFEESHOP_FRAGMENT}
`;

export const SEARCH_CATEGORIES = gql`
  query searchCategories($keyword: String!) {
    searchCategories(keyword: $keyword) {
      id
      name
    }
  }
`;
