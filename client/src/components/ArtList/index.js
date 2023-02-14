import React from 'react';
import { Link } from 'react-router-dom';

const ArtList = ({
  art,
  title,
  showTitle = true,
  showUsername = true,
}) => {
  if (!art.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <div>
      {showTitle && <h3>{title}</h3>}
      {art &&
       art.map((art) => (
          <div key={art._id} className="card mb-3">
            <h4 className="card-header bg-primary text-light p-2 m-0">
              {showUsername ? (
                <Link
                  className="text-light"
                  to={`/profiles/${art.artAuthor}`}
                >
                  {art.artAuthor} <br />
                  <span style={{ fontSize: '1rem' }}>
                    had this idea on {art.createdAt}
                  </span>
                </Link>
              ) : (
                <>
                  <span style={{ fontSize: '1rem' }}>
                    You had this comment on {art.createdAt}
                  </span>
                </>
              )}
            </h4>
            <div className="card-body bg-light p-2">
              <p>{art.artText}</p>
            </div>
            <Link
              className="btn btn-primary btn-block btn-squared"
              to={`/art/${art._id}`}
            >
              Join the discussion on this.
            </Link>
          </div>
        ))}
    </div>
  );
};

export default ArtList;
