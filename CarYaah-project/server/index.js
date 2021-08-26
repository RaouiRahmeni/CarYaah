const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const clientRouter = require("./routers/clientroutes");
const PORT = 3000;
const sequelize = require("./db/index.js");
// const db = require("./db/index.js");
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/register", clientRouter);
app.use("/api/reservation", clientRouter);
app.get("/", (req, res) => {
  res.send({ msg: "done" });
});

app.post("/owner", (req, res) => {
  console.log("done");
  res.send("success");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});