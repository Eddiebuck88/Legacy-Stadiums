import axios from 'axios';

const search = async (query) =>
  axios.get(`http://www.omdbapi.com/?apikey=trilogy&t=${query}&rating=pg`);

const artsearch = async (query)=>
axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);

const artobject = async (oid)=>
axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${oid}`);

export default { search, artsearch, artobject };