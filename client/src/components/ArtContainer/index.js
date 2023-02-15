import React from 'react';
import { useState, useEffect } from 'react';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import Card from './Card';
import SearchForm from './SearchForm';
import ArtDetail from './ArtDetail';
import API from '../../utils/API';

import { ADD_ART } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

const ArtContainer = () => {
  const [result, setResult] = useState({});
  const [search, setSearch] = useState('');
const [addArt, { error }] = useMutation(ADD_ART); 

  // When the search form is submitted, use the API.search method to search for the movie(s)
  const searchMovie = (query) => 
    API.artsearch(query)
      .then((res) => { console.log(res.data)
        API.artobject(res.data.objectIDs[0])
         .then((res) => setResult(res.data))
         .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  // useEffect hook runs on startup only. starts with a preset movie
  useEffect(() => {
    searchMovie('Scream');
  },[]);

  // handleInputChange lets you type in the search textbox
  const handleInputChange = (event) => {
    console.log(event.target.value);
     setSearch(event.target.value);
  };

  //  Fix the handleFormSubmit function not actually searching for the movie
  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchMovie(search);
  };

  const handleArtSubmit = async (e) => {
    e.preventDefault();
let aid = parseInt(result.objectID);
 const atitle = result.title;
    try {
console.log(aid)
      const { data } = await addArt({
        variables: {
          artId: result.objectID,
          artTitle: atitle,
          artImage: result.primaryImageSmall,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });
       window.location.assign('/gallery');
    } catch (err) {
      console.error(err);
      } 
    };


  // Destructure the result object to make the code more readable, assign them to empty strings to start
  const {
    title = '',
    primaryImageSmall = '',
    artistDisplayName = '',
    department = '',
    accessionYear = '',
  } = result;

  /* Fall back to default header if `Title` is undefined
  Does `Title` exist? If so, render the `ArtDetail` card 
  If not, render a different header */

  return (
    <Container>
      <Row>
        <Col size="md-8">
          <Card heading={title || 'Search for a Movie to Begin'}>
            {title ? (
              <ArtDetail
                title={title}
                src={primaryImageSmall}
                director={artistDisplayName}
                genre={department}
                released={accessionYear}
              />
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Card>
        </Col>
        <Col size="md-4">
          <Card heading="Search">
            <SearchForm
              value={search}
              handleInputChange={handleInputChange}
              handleFormSubmit={handleFormSubmit}
              handleArtSubmit={handleArtSubmit}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ArtContainer;
