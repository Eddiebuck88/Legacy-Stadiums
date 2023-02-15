import React from 'react';
import { useQuery } from '@apollo/client';

import ArtList from '../components/ArtList';
import ArtContainer from '../components/ArtContainer';

import { QUERY_GALLERY } from '../utils/queries';

const Gallery = () => {
  const { loading, data } = useQuery(QUERY_GALLERY);
  const art = data?.gallery || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ArtContainer />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ArtList
              art={art}
              title="Gallery"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
