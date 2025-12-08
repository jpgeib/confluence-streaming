require("dotenv").config();
const fs = require("fs");
console.log(`NODE_ENV at stattup: ${process.env.NODE_ENV}`);
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const helmet = require("helmet");

const app = express();
const server = require("http").createServer(app);
const path = require("path");
const routes = require("./routes");
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://confluence-streaming-108b2e0ec103.herokuapp.com",
  "http://www.omdbapi.com"
];
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: [
        "'self'",
        "https://confluence-streaming-108b2e0ec103.herokuapp.com",
        "http://www.omdbapi.com",
        "https://www.omdbapi.com"
      ],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: [
        "'self'", 
        "'unsafe-inline'",
        "https://cdn.jsdelivr.net"
      ],
      fontSrc: [
        "'self'",
        "https://cdn.jsdelivr.net"
      ],
      imgSrc: ["'self'", "data:", "https:", "http:"],
    },
  },
}));
app.use(routes);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// OMDB & Poster API Setup Configuration
const api_key = process.env.OMDB_API_KEY;
const base_url = 'http://www.omdbapi.com/';
const poster_base_url = 'http://img.omdbapi.com/';

// API routing to fetch movie / poster data
app.get('/api/get-movie', async (req, res) => {
  try {
    const movieTitle = req.query.title;

    if (!movieTitle) {
      return res.status(400).json({ error: "Movie title is required" });
    }

    const url = `${base_url}?apikey=${api_key}&t=${encodeURIComponent(movieTitle)}`;

    const response = await fetch(url);
    const data = await response.json();
    
    if (data.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    const enhancedData = {
      ...data,
      PosterSecure: `${poster_base_url}?apikey=${api_key}&i=${data.imdbID}&h=600`
    };

    res.json(enhancedData);
  }
  catch (error) {
    console.error("Server error: ", error)
    res.status(500).json({error: "Internal server error"});
  }
})

// Server checkup
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});