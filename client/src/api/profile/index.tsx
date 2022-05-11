import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($userId: String!) {
    user(userId: $userId) {
      _id,
      name,
      email,
      phone,
      bio,
      photo,
      createdAt,
      updatedAt
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUser($userId: String!, $name: String, $email: String, $phone: String, $bio: String, $password: String) {
    updateUser(userId:$userId, name:$name, email:$email, phone:$phone, bio:$bio, password:$password) {
      _id,
      updatedAt
    }
  }
`;

export const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($userId: String!, $base64EncodedImage: String!) {
    uploadAvatar(userId:$userId, base64EncodedImage:$base64EncodedImage) {
      success,
      code,
      message
    }
  }
`;