import axios from 'axios';

const artsearch = async (query)=>
axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${query}`);

const artobject = async (oid)=>
axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${oid}`);

export default { artsearch, artobject };
