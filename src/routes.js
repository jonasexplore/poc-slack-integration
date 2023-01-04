const { Router } = require("express");
const { custodyController } = require("./controller");

const router = Router();

router.post("/custody", custodyController);

module.exports = { router };
