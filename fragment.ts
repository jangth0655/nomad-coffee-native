import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    isMe
    id
    username
    avatarURL
  }
`;

export const COFFEE_FRAGMENT = gql`
  fragment CoffShopFragment on CoffeeShop {
    id
    name
    slug
    payload
  }
`;
