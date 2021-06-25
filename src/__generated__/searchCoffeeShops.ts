/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCoffeeShops
// ====================================================

export interface searchCoffeeShops_searchCoffeeShops {
  __typename: "CoffeeShop";
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  isMine: boolean;
}

export interface searchCoffeeShops {
  searchCoffeeShops: (searchCoffeeShops_searchCoffeeShops | null)[] | null;
}

export interface searchCoffeeShopsVariables {
  keyword: string;
}
