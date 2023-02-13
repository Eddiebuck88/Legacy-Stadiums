import React from 'react';
import { useQuery } from '@apollo/client';

import ArtList from '../components/ArtList';
import ArtForm from '../components/ArtForm';

import { QUERY_ART } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_ART);
  const art = data?.art || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ArtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ArtList
              art={art}
              title="Some Food for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
