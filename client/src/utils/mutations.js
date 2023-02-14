import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ART = gql`
mutation addArt($artId: String!, $artImage: String, $artDescription: String) {
  addArt(artId: $artId, artImage: $artImage, artDescription: $artDescription) {
    artId
    artAuthor
    _id
    artDescription
    artImage
  }
}
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(artId: $artId, commentText: $commentText) {
      _id
      artId
      artAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
