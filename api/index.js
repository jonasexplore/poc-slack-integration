const express = require("express");

const app = express();
app.use(express.json());

const custodyController = (req, res) => {
  try {
    console.log("INFO >> BODY >> ", req.body);

    if (req.body?.challenge) {
      return res.send(req.body.challenge);
    }

    return res.status(200);
  } catch (error) {
    console.log("ERROR >> ", error);
    return res.json({ message: error?.message }).status(500);
  }
};

app.post("/api/custody", custodyController);

app.listen(3000, () => console.log("🔮 application has started."));
