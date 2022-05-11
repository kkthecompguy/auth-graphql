import { gql } from "@apollo/client";


export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success,
    code,
    message,
    accessToken,
    tokenType,
    user {
      _id,
      name,
      email,
    }
  }
}
`;

export const REGISTER_USER = gql`
mutation createUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    _id,
    email,
    createdAt,
    updatedAt
  }
}
`;