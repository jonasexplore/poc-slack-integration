const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const custodyController = (req, res) => {
  try {
    const resquest = req.body;
    console.log("INFO >> BODY >> ", resquest);

    if (resquest?.challenge) {
      return res.send(resquest.challenge);
    }

    return res.status(200).send();
  } catch (error) {
    console.log("ERROR >> ", error);
    return res.json({ message: error?.message }).status(500);
  }
};

app.post("/api/custody", custodyController);

app.listen(3000, () => console.log("🔮 application has started."));
