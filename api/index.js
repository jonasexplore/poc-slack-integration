const express = require("express");
const axios = require("axios").default;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const custodyController = async (req, res) => {
  try {
    const request = req.body;

    if (request?.challenge) {
      return res.send(request.challenge);
    }

    console.log(request);

    if (request?.payload) {
      const payload = JSON.parse(JSON.stringify(request.payload));

      console.table([
        ["user", payload?.user?.name],
        ["request", payload?.message?.text],
        ["Callback ID", payload?.callback_id],
      ]);

      const messageResponse =
        "Recebemos sua solicitação! Iremos marcar que a transferência foi realizada com sucesso, muito obrigado.";

      try {
        await axios.post(payload.response_url, {
          text: messageResponse,
        });
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
