import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_ART } from '../../utils/mutations';
import { QUERY_ART, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';

const ArtList = ({
    art,
    title,
    showTitle = true,
    showUsername = true,
  }) => {
    if (!art.length) {
      return <h3>No Comments Yet</h3>;
    }