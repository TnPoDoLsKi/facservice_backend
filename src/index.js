import express from "express";
import http from "http";
import routes from "./config/routes";
import bodyParser from "body-parser";
import session from 'express-session'
import "./config/database";
import { SECRET } from "./config/env";

const app = express();
const server = http.createServer(app);

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

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

app.use("/", routes);

server.listen(3000, () => console.log("start in dev environment on port 3000"));
