// Axios is a popular NPM package used for preforming API requests
import axios from 'axios';

// Using axios, we create a search method that is specific to our use case and export it at the bottom
const search = (query) =>
  axios.get(`https://api.seatgeek.com/2/venues?client_id= MzE4NzgyNDJ8MTY3NjE1MzA3OS42NDk4MTM0&client_secret=5ccf750daeeda7c3d66e237382995e0dc3a2953738d7b62ec5c68329d2c2959e`);

// Export an object with a "search" method that searches the Giphy API for the passed query
export default search;
