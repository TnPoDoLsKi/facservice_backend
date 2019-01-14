import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";

import routes from "./config/routes";
import "./config/database";

const app = express();
const server = http.createServer(app);

app.use(
  bodyParser.json({
    limit: "4mb"
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(morgan("dev"));
//create a cors middleware
app.use(function(req, res, next) {
  //set headers to allow cross origin request.
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", routes);

server.listen(3000, () => console.log("start in dev environment on port 3000"));
