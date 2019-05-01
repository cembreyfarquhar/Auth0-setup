const express = require("express");
const cors = require("cors");
const server = express();

require("dotenv").config();

const jwtDecoder = require("jsonwebtoken");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const bodyParser = require("body-parser");
const knex = require("knex");

const db = require("./dbConfig");

server.use(cors());
server.use(bodyParser.json());

function func(req, res, next) {
  function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  const token = req.headers.authorization;
  const client = jwksRsa({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.JWKSURI
  });
  const options = {
    algorithm: "RS256"
  };
  const callerback = function(error, decoded) {
    if (error) {
      res.status(400).json({ message: "Invalid response" });
    } else {
      req.headers.decoded = decoded;
      next();
    }
  };
  jwtDecoder.verify(token, getKey, options, callerback);
}

server.post("/login", func, async (req, res) => {
  const auth_id = req.headers.decoded.sub;
  console.log(auth_id);

  try {
    const user = await db("users").insert({ auth_id });
    console.log("adding user");
    res.status(200).json(user);
  } catch (error) {
    console.log("user exists");
    res.status(201).json({ message: "User already exists" });
  }
});

server.get("/users", async (req, res) => {
  const users = await db("users");
  res.status(201).json(users);
});

server.get("/", (req, res) => {
  res.status(200).send("it is online");
});

const port = 5000;

server.listen(port, function() {
  console.log(`*** Server listening on port ${port}. ***`);
});
