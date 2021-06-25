/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: searchCategories
// ====================================================

export interface searchCategories_searchCategories {
  __typename: "Category";
  id: number;
  name: string;
}

export interface searchCategories {
  searchCategories: (searchCategories_searchCategories | null)[] | null;
}

export interface searchCategoriesVariables {
  keyword: string;
}
