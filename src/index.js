import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import routes from "./config/routes";
import session from "express-session";
import cors from "cors";
import "./config/database";
import { SECRET, PORT, NODE_ENV } from "./config/env";

const app = express();
const server = http.createServer(app);

app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  })
);

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
app.use(cors());
app.use("/api", routes);

server.listen(PORT, () =>
  console.log(`start in ${NODE_ENV} environment on port ${PORT}`)
);
