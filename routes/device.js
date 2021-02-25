const express = require("express");
const Device = require("../models/device");
const MqttACL = require("../models/mqtt_acl");
const shortid = require("shortid");
const router = express.Router();

router.post("/", (req, res) => {
  const productName = req.body.product_name;
  const deviceName = shortid.generate();
  const secret = shortid.generate();
  const brokerUsername = `${productName}/${deviceName}`;

  const device = new Device({
    product_name: productName,
    device_name: deviceName,
    secret: secret,
    broker_username: brokerUsername,
  });

  device.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //生成设备的 ACL 记录
      const mqttACL = new MqttACL({
        broker_username: brokerUsername,
        publish: [],
        subscribe: [],
        pubsub: [],
      });

      mqttACL.save((aclErr) => {
        if (aclErr) {
          res.status(500).send(aclErr);
        } else {
          res.json({
            product_name: productName,
            device_name: deviceName,
            secret: secret,
          });
        }
      });
    }
  });
});

module.exports = router;
