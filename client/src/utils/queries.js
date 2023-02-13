import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      art {
        _id
        artText
        createdAt
      }
    }
  }
`;

export const QUERY_ART = gql`
  query getArt {
    art {
      _id
      artText
      artAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_ART = gql`
  query getSingleArt($artId: ID!) {
    art(artId: $artId) {
      _id
      artText
      artAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      art {
        _id
        artText
        artAuthor
        createdAt
      }
    }
  }
`;
