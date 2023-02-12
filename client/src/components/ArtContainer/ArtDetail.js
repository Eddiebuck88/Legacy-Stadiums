import React from 'react';

function ArtDetail(props) {
  return (
    <div className="text-center">
      <img
        alt={props.title}
        className="img-fluid"
        src={props.src}
        style={{ margin: '0 auto' }}
      />
      <h3>Artist: {props.director}</h3>
      <h3>Department: {props.genre}</h3>
      <h3>Year: {props.released}</h3>
    </div>
  );
}

export default ArtDetail;
