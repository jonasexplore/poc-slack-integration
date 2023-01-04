const express = require("express");
const { Router } = require("express");

const custodyController = (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
};

const router = Router();

router.post("/custody", custodyController);

const app = express();

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => console.log("🔮 application has started."));
