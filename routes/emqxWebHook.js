const express = require("express");
const router = express.Router();
const Device = require("../models/device");
const messageService = require("../lib/messageService");

router.post("/", (req, res) => {
  console.log("emqxwebhook=>>", req.body);
  switch (req.body.action) {
    case "client_connected":
      Device.addConnection(req.body);
      break;
    case "client_disconnected":
      Device.removeConnection(req.body);
      break;
    case "message_publish":
      messageService.dispatchMessage({
        topic: req.body.topic,
        payload: Buffer.from(req.body.payload, "base64").toString(),
        ts: req.body.ts,
      });
  }
  res.status(200).send("ok");
});

module.exports = router;
