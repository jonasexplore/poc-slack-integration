const custodyController = (req, res) => {
  console.log(req.body);
  return res.sendStatus(200);
};

module.exports = { custodyController };
