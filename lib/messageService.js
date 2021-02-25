const pathToRegexp = require("path-to-regexp");
const redisClient = require("./redis");
const Message = require("../models/message");

class MessageService {
  static dataTopicRule =
    "upload_data/:productName/:deviceName/:dataType/:messageId";

  static dispatchMessage({ topic, payload, ts } = {}) {
    const topicRegx = pathToRegexp(this.dataTopicRule);
    console.log("dispathMessage =>> ", topic, payload, ts);
    let result = null;
    if ((result = topicRegx.exec(topic)) != null) {
      // const messageId = result[4];
      // this.checkMessageDuplication(messageId, (isDup) => {
      //   //消息不重复时处理
      //   if (!isDup) {
      //     this.handleUploadData({
      //       productName: result[1],
      //       deviceName: result[2],
      //       dataType: result[3],
      //       messageId,
      //       ts,
      //       payload: Buffer.from(payload, "base64"), //base64解码
      //     });
      //   }
      // });
    }
  }

  static handleUploadData({
    productName,
    deviceName,
    ts,
    payload,
    messageId,
    dataType,
  } = {}) {
    var message = new Message({
      product_name: productName,
      device_name: deviceName,
      payload: payload,
      message_id: messageId,
      data_type: dataType,
      sent_at: ts,
    });
    message.save();
  }

  static checkMessageDuplication(messageId, callback) {
    const key = `/messageIDs/${messageId}`;
    redisClient.setnx(key, "", (err, res) => {
      // key 不存在
      if (res == 1) {
        redisClient.expire(key, 60 * 60 * 6);
        callback.call(this, false);
      } else {
        callback.call(this, true);
      }
    });
  }
}

module.exports = MessageService;
