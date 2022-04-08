// configure express
const express = require("express");
const app = express();
app.use(express.json());

// configure morgan
const morgan = require("morgan");
app.use(morgan("tiny"));

