const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const custodyController = (req, res) => {
  if (req.body?.challenge) {
    fs.writeFile("custody.txt", JSON.stringify(req.body), function (err) {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log("Saved!");
    });

    return res.send(req.body.challenge);
  }

  return res.sendStatus(200);
};
app.post("/api/custody", (req, res) => {
  return custodyController(req, res);
});

app.listen(3000, () => console.log("🔮 application has started."));
