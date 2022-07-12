// ctr + c - cut the server
// const express = require('express'); //importing
// const { MongoClient } = require("mongodb");
// const app = express()

// importing after updating "type": "module" in package.json
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv" 

dotenv.config();

const app = express();

const PORT = process.env.PORT;
// const PORT = process.env.PORT;

const movies= [
  {
    id: "100",
    name: "RRR",
    poster:
      "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
    rating: 8.8,
    summary:
      "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
    trailer: "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
    id: "101",
    name: "Iron man 2",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
    rating: 7,
    summary:
      "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
    trailer: "https://www.youtube.com/embed/wKtcmiifycU"
  },
  {
    id: "102",
    name: "No Country for Old Men",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
    rating: 8.1,
    summary:
      "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
    trailer: "https://www.youtube.com/embed/38A__WT3-o0"
  },
  {
    id: "103",
    name: "Jai Bhim",
    poster:
      "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
    summary:
      "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
    rating: 8.8,
    trailer: "https://www.youtube.com/embed/nnXpbTFrqXA"
  },
  {
    id: "104",
    name: "The Avengers",
    rating: 8,
    summary:
      "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
    poster:
      "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    trailer: "https://www.youtube.com/embed/eOrNdBpGMv8"
  },
  {
    id: "105",
    name: "Interstellar",
    poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
    rating: 8.6,
    summary:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
    trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
  },
  {
    id: "106",
    name: "Baahubali",
    poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
    rating: 8,
    summary:
      "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
    trailer: "https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {
    id: "107",
    name: "Ratatouille",
    poster:
      "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
    rating: 8,
    summary:
      "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
    trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w"
  }
];

// app.use intercepts all the request and applies express.json() (Inbuilt middleware)
app.use(express.json());


// connecting to MongoDB
// const MONGO_URL = "mongodb://localhost"  //nodejs - 16
// const MONGO_URL = "mongodb://127.0.0.1"; // nodejs - 16+
const MONGO_URL = process.env.MONGO_URL;
async function createConnection(){
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB is connected");
  return client;
}
const client = await createConnection();




//-------------- Create - POST Operation ------------------//


// middleware (inbuilt) - express.json() - will convert body to JOSON
app.post('/movies', async function (req, res){
  const data = req.body;
  console.log(data);
  const result = await client.db("guvi").collection("movies").insertMany(data);
  res.send(result);
})



//-------------- Read - GET Operation ------------------//

app.get('/', function (req, res) {
  res.send('Hello World')
})

// function to show movies data
app.get('/movies', async function (request, response) {
  console.log(request.query); // query returns the query given by the user
  
  if(request.query.rating){
    request.query.rating = +request.query.rating;
  }

  console.log(request.query);
  // Find returns Cursor - Pagination : To convert cursor to Array use toArray();
  const movies = await client.db("guvi").collection("movies").find(request.query).toArray();
  // console.log(movies);
  response.send(movies);

})

// using filter method to get particular movies
// app.get('/movies/:id', function (request, response) {
//   const {id} = request.params;
//   console.log(request.params, id);
//   const movie = movies.filter((mv)=> mv.id == id)[0];
//   response.send(movie)
// })


// using find method to get particular movies
app.get('/movies/:id', async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);

  // console.log(request.query);

  // const movie = movies.find((mv)=> mv.id == id); // receiving movies saved locally
  const movie = await client.db("guvi").collection("movies").findOne({id: id})  // getting movies from mongoDB database
  console.log(movie);
  movie ? response.send(movie) : response.status(404).send({msg: "Movie not fount"});
})


//-------------- Update - PUT Operation ------------------//

// using update method to update a field in movies
app.put('/movies/:id', async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);
  const data = request.body;
  
  // db.movies.updateOne({id: "101"},{$set: data});

  const result = await client.db("guvi").collection("movies").updateOne({id: id},{$set: data});  // getting movies from mongoDB database
  response.send(result);
  
})

//-------------- Delete - DELETE Operation ------------------//


// using delete method to delete particular movies
app.delete('/movies/:id', async function (request, response) {
  const {id} = request.params;
  console.log(request.params, id);
  // db.movies.deleteOne({id: "101"});

  const result = await client.db("guvi").collection("movies").deleteOne({id:id});

  console.log(result);
  result.deletedCount !=0 ? response.send(result) : response.status(404).send({Msg: "Movie not found"});
 
})



app.listen(PORT, ()=> console.log(`App started in ${PORT}`));