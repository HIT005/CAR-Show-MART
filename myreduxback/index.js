const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json()); // Parse JSON requests
app.use(cors());
const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost:27017/redux-mydataflow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database.");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
const dataSchema = new mongoose.Schema({
  image: String,
  name: String,
  price: String,
});

const Data = mongoose.model("Data", dataSchema);

app.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to load data " });
  }
  // res.send("Hello, World!");
});

app.post("/createdata", async (req, res) => {
  try {
    let data = new Data(req.body);
    let dataresult = await data.save();
    res.json({ dataresult });
    //console.warn(dataresult)
  } catch (error) {
    res.status(500).json({ error: "Failed to create data " });
  }
   //res.send('Hello data')
});

app.get("/items/:id", async(req, res) => {
  try {
    const data = await Data.findOne({_id:req.params.id});
    res.json({ data });
  } catch (error) {
    res.status(500).json({ error: "Failed to load data " });
  }
  
});
