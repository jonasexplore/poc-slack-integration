const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const custodyController = (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.send(error).status(500);
  }
};
app.post("/api/custody", custodyController);

app.listen(3000, () => console.log("🔮 application has started."));
