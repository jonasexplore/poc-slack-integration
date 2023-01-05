const axios = require("axios").default;

const REACTIONS = {
  white_check_mark: "white_check_mark",
};

const postMessage = async ({ channel, timestamp, text }) => {
  const payload = {
    channel,
    thread_ts: timestamp,
    text,
  };

  return axios.post("https://slack.com/api/chat.postMessage", payload, {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
    },
  });
};

const reactionsAdd = async ({ channel, timestamp, reaction }) => {
  const payload = {
    channel,
    timestamp,
    name: REACTIONS[reaction],
  };

  return axios.post("https://slack.com/api/reactions.add", payload, {
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
  });
};

module.exports = {
  postMessage,
  reactionsAdd,
  REACTIONS,
};
