const express = require("express");
const { postMessage, reactionsAdd, REACTIONS } = require("./slack");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const custodyController = async (req, res) => {
  try {
    const request = req.body;

    if (request?.challenge) {
      return res.send(request.challenge);
    }

    if (request?.payload) {
      const payload = JSON.parse(request.payload);

      const channel = payload?.channel?.id;
      const timestamp = payload?.message?.ts;

      console.log("PAYLOAD >> ", payload);

      const messageResponse =
        "Recebemos sua solicitação! Iremos marcar que a transferência foi realizada com sucesso, muito obrigado.";

      try {
        const promisses = [
          postMessage({
            channel,
            timestamp,
            text: messageResponse,
          }),
          reactionsAdd({
            channel,
            timestamp,
            reaction: REACTIONS.white_check_mark,
          }),
        ];

        await Promise.all(promisses);
      } catch (error) {
        return res.status(200).send();
      }
    }

    return res.status(200).send();
  } catch (error) {
    console.log("ERROR >> ", error);
    return res.json({ message: error?.message }).status(500);
  }
};

app.post("/api/custody", custodyController);

app.listen(3000, () => console.log("🔮 application has started."));
