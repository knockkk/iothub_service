var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const mqttACLSchema = new Schema(
  {
    broker_username: String,
    publish: Array,
    subscribe: Array,
    pubsub: Array,
  },
  { collection: "mqtt_acl" }
);

const MqttACL = mongoose.model("MqttACL", mqttACLSchema);

module.exports = MqttACL;
