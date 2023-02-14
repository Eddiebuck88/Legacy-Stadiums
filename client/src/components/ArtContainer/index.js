import React from 'react';
import { useState, useEffect } from 'react';
import Container from './Container';
import Row from './Row';
import Col from './Col';
import Card from './Card';
import SearchForm from './SearchForm';
import ArtDetail from './ArtDetail';
import API from '../../utils/API';
import { useMutation } from "@apollo/client";

import { ADD_ART } from "../../utils/mutations";

const ArtContainer = () => {
  const [result, setResult] = useState({});
  const [search, setSearch] = useState('');
  const [addArt, { error }] = useMutation(ADD_ART, {
    onError: (error) => {
      console.log(error)
    }
  });

  // When the search form is submitted, use the API.search method to search for the movie(s)
  const searchArt = (query) => 
    API.artsearch(query)
      .then((res) => { console.log(res.data)
        API.artobject(res.data.objectIDs[0])
         .then((res) => setResult(res.data))
         .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));

  // useEffect hook runs on startup only. starts with a preset movie
  useEffect(() => {
    searchArt('Scream');
  },[]);

  // handleInputChange lets you type in the search textbox
  const handleInputChange = (event) => {
    console.log(event.target.value);
     setSearch(event.target.value);
  };

  //  Fix the handleFormSubmit function not actually searching for the movie
  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchArt(search);
  };
  const handleArtSubmit = async (event) => {
    event.preventDefault();
    console.log(result);

    // api fetch
    API.artobject(result.objectID).then(async (res) => {
      console.log(res.data);
      let paintingId = parseInt(res.data.objectID)
      paintingId = paintingId.toString()
      const artDescription = res.data.title
      const artImage = res.data.primaryImageSmall
      console.log(typeof paintingId,typeof artDescription,typeof artImage)
      try {
        const { data } = await addArt({
          variables: {
            artId: paintingId,
            artDescription: artDescription,
            artImage: artImage
          },
        });

       
      } catch (err) {
        console.error(err);
      }
    });
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
          <Card heading={title || 'Search for art Begin'}>
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
