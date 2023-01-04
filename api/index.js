const express = require("express");

const app = express();
app.use(express.json());

const custodyController = (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
};
app.post("/api/custody", custodyController);

app.listen(3000, () => console.log("🔮 application has started."));
