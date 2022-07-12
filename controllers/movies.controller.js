const dotenv =require('dotenv');
dotenv.config()
const omdbKey = process.env.OMDB_KEY
const axios = require('axios')

const getTop10Movies = async (req, res) => {
  let topMovies = []
  let typesOfMovies = ["Disaster", "Epic", "war", "kids", "Silent", "Horror", "Anthology", "comedia", "dark", "documentary"];
  await Promise.all(typesOfMovies.map(async (movie) => {
    await axios.get(`http://www.omdbapi.com/?t=${movie}&apikey=${omdbKey}`)
      .then(result => {
        topMovies.push(result.data)
      })
  })).then(movies => {
    res.status(200).json({ data: topMovies })
  });
}
const searchMovie = async (req, res) => {
  const searchBy = req.params;
   return new Promise(async (reso) => {
    await axios.get(`http://www.omdbapi.com/?s=${searchBy.search}&apikey=${omdbKey}`)
      .then(response => {
        res.status(200).json({ data: response.data })
      })
      .catch(err => {
        console.log("err", err);
      })
  })
};


module.exports = { getTop10Movies, searchMovie };
