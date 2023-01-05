const { request } = require("express");
const express = require("express");
const axios = require("axios").default;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const custodyController = async (req, res) => {
  try {
    const resquest = req.body;
    // console.log("INFO >> BODY >> ", resquest);

    if (resquest?.challenge) {
      return res.send(resquest.challenge);
    }

    if (request?.payload) {
      const payload = request.payload;

      if (payload.type === "message_action") {
        console.log(
          "User: ",
          payload?.user?.name,
          "Request",
          payload?.message?.text,
          "Callback ID: ",
          payload?.callback_id
        );

        const messageResponse =
          "Recebemos sua solicitação! Iremos marcar que a transferência foi realizada com sucesso, muito obrigado.";

        await axios.post(payload.response_url, {
          text: messageResponse,
        });
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
