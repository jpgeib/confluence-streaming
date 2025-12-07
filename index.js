require("dotenv").config();
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
  "https://confluence-streaming-108b2e0ec103.herokuapp.com/"
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
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            "connect-src": [
                "'self'",
                "confluence-streaming-108b2e0ec103.herokuapp.com/"
            ],
            "img-src": [
                "'self'",
                "confluence-streaming.s3.us-east-1.amazonaws.com",
            ],
            "form-action": [
                "'self'",
                "confluence-streaming-108b2e0ec103.herokuapp.com/"
            ],
            "script-src": [
                "'self'",
                (req, res) => `'nonce-${res.locals.cspNonce}'`,
                "ajax.googleapis.com"
            ]
        }
    }
}));
app.use(routes);

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// OMDB Setup Configuration
const api_key = process.env.OMDB_API_KEY;
const base_url = 'http://www.omdbapi.com/';
const test_movie = 'Interstellar';

// Testing OMDB Connection
async function testOMDBConnection() {
  try {
    // Creating full search url
    const url = `${base_url}?apikey=${api_key}&t=${test_movie}`;
    console.log(`fetching data for: ${test_movie}...`);

    // send request to OMDB
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Check for API Errors
    if (data.Response === 'False') {
      console.error('OMDB API Error: ', data.Error);
      return;
    }

    // Successful fetch
    console.log('Connection Successful!');
    console.log(`Title: ${data.Title}, Year: ${data.Year}, Rating: ${data.imdbRating}`);
  }
  catch (error) {
    console.error('Fetch error: ', error.message);
  }
}

// Server checkup
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

testOMDBConnection();