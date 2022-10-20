const express = require("express");
const cors = require("cors");

const { db } = require("./database");
const commonRouter = require("./routes/commonRoutes");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use("/api/commonRoute", commonRouter);

app.get("/", async (req, res) => {
  console.log("hi we are running");
  return res.json("Hiii we are running");
});
app.get("/api/getCollection", async (req, res) => {
  db.collection("students")
    .find({ name: "Sanjay" })
    .toArray(function (err, results) {
      return res.json(results);
    });
});
app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
