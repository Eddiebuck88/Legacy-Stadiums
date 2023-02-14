import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ART } from '../../utils/mutations';
import { QUERY_ART, QUERY_ME } from '../../utils/queries';
import API from '../../utils/API';
import Auth from '../../utils/auth';



const ArtForm = () => {
  const [artId, setArtId] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addArt, { error }] = useMutation(ADD_ART, {
    update(cache, { data: { addArt } }) {
      try {
        const { art } = cache.readQuery({ query: QUERY_ART });

        cache.writeQuery({
          query: QUERY_ART,
          data: { art: [addArt, ...art] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, art: [...me.art, addArt] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // api fetch 
    API.artobject(artId)
         .then((res) => {
           console.log(res.data) 
          /*  const data=res.data;
          try {
            const { data } = await addArt({
              variables: {
                artId,
                artAuthor: Auth.getProfile().data.username,
              },
            })
      
            setArtId('');
          }
          
           catch (err) {
            console.error(err);
          }
         }; */
         
      })
         .catch((err) => console.log(err)); 

    /* try {
      const { data } = await addArt({
        variables: {
          artId,
          artAuthor: Auth.getProfile().data.username,
        },
      });

      setArtId('');
    } catch (err) {
      console.error(err);
    } */
  }; 

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'artId' && value.length <= 280) {
      setArtId(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="artId"
                placeholder="Here's some new art..."
                value={artId}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Submit 
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ArtForm;
