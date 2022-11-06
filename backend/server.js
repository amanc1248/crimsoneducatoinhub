const express = require("express");
const cors = require("cors");
const dotenv =  require("dotenv");
const path = require("path");

const { db } = require("./database");
const commonRouter = require("./routes/commonRoutes");

dotenv.config();
const PORT = process.env.PORT || 3001;
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
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/api", (req, res) => {
    res.send("Api is running");
  });
}
app.listen(PORT, () => console.log("Server is running..."));
