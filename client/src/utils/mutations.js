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
  mutation addArt($artText: String!) {
    addArt(artText: $artText) {
      _id
      artText
      artAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($thoughtId: ID!, $commentText: String!) {
    addComment(artId: $artId, commentText: $commentText) {
      _id
      artText
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
