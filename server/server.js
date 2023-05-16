const express = require("express");
const app = express();
const cors = require('cors');
const port = 5000;
const wowCat = require("./routes/WowCat");
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get("/", (req, res) => {
  res.json({ message: "ok" });
});


 app.use("/wowCat", wowCat);


app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});