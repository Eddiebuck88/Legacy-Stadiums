import React from 'react';

function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="form-control"
          placeholder="Search For a Painting"
          id="search"
        />
        <br />
        <button
          onClick={props.handleFormSubmit}
          className="btn btn-primary"
          type="submit"
        >
          Search
        </button>
        <button
          onClick={props.handleArtSubmit}
          className="btn btn-primary"
          type="submit"
        >
         Add to Gallery
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
