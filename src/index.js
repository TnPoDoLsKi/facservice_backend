import express from "express";
import http from "http";
import morgan from "morgan";
import routes from "./config/routes";
import bodyParser from "body-parser";
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
app.use("/", routes);

server.listen(3000, () => console.log("start in dev environment on port 3000"));
