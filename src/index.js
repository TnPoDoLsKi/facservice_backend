import express from "express";
import http from "http";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./config/routes";
import session from "express-session";
import connectMongo from "connect-mongo";
// import mongooseConnection from "./config/database";
import "./config/database";
import cors from "cors";
import path from "path";
import { SECRET, PORT, NODE_ENV } from "./config/env";

const app = express();
const server = http.createServer(app);

const mongoStore = connectMongo(session);
let sess = {
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {},
  store: new mongoStore({
    mongooseConnection: mongoose.connection
  })
};

// if (NODE_ENV == "production") sess.cookie.secure = true;

app.use(session(sess));

app.use(
  bodyParser.json({
    limit: "100mb"
  })
);

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(morgan("dev"));
app.use(cors());
app.use("/api", routes);
app.use(
  "/uploads/",
  express.static(path.join(__dirname, "/../public/uploads/"))
);
app.use("/pdfs/", express.static(path.join(__dirname, "/../public/pdfs/")));
app.use("/apidoc/", express.static(path.join(__dirname, "/../public/apidoc/")));

server.listen(PORT, () =>
  console.log(`start in ${NODE_ENV} environment on port ${PORT}`)
);
