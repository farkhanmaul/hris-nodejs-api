const admin = require("firebase-admin");
const notificationModel = require("../models/notification_model");
const validation = require("../utils/validation");
const { HTTP_STATUS, RESPONSE_CODES, RESPONSE_MESSAGES } = require("../utils/globals.js");
const response = require("../middleware/response");
const serviceAccount = require("../acamobiled-firebase-adminsdk.json");

// Initialize Firebase Admin SDK with your service account credentials
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   // Replace `serviceAccount` with the path to your service account JSON file
});

async function sendPushNotificationHandler(req, res) {
   const { employee_id, deviceToken, title, body, data } = req.body;
   if (
      !validation.validateUserInput(employee_id) ||
      !validation.validateUserInput(deviceToken) ||
      !validation.validateUserInput(title) ||
      !validation.validateUserInput(body) ||
      !validation.validateUserInput(data)
   ) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }

   const message = {
      notification: {
         title: title,
         body: body,
      },
      data: data,
      token: deviceToken,
   };

   try {
      await admin.messaging().send(message);
      response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Push notification sent successfully", {}, res, req);
   } catch (error) {
      console.error("Error sending push notification:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to sent notification",
         {},
         res,
         req
      );
   }
}

async function sendPushNotification(deviceToken, title, body, data, employee_id) {
   if (!deviceToken || !title || !body || !employee_id) {
      throw new Error("Missing required parameters");
   }

   const message = {
      notification: {
         title: title,
         body: body,
      },
      data: {
         ...data,
         notification_id: "0", // Placeholder for the notification ID
      },
      token: deviceToken,
   };
   try {
      // Insert the notification into the notification_inbox table using the separate model function
      const notificationId = await notificationModel.insertNotification(employee_id, title, body, message.data);

      // Update the notification message data with the actual notification ID
      message.data.notification_id = notificationId;

      // Send the push notification
      await admin.messaging().send(message);
   } catch (error) {
      console.error("Error sending push notification:", error);
      throw new Error("Failed to send push notification");
   }
}

async function getNotificationInbox(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await notificationModel.getNotificationData(employee_id);

      if (!result) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
            "No notifications found for the specified employee ID",
            null,
            res,
            req
         );
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Notification data retrieved successfully",
            result[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve notification data:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to retrieve notification data",
         null,
         res,
         req
      );
   }
}

async function getSpecifyNotificationInbox(req, res) {
   const { employee_id, notification_id } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(notification_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await notificationModel.getSpecifyNotificationData(employee_id, notification_id);

      if (!result) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
            "No notifications found for the specified employee ID",
            null,
            res,
            req
         );
      } else {
         response(
            HTTP_STATUS.OK,
            RESPONSE_CODES.SUCCESS,
            "Notification data retrieved successfully",
            result[0],
            res,
            req
         );
      }
   } catch (error) {
      console.error("Failed to retrieve notification data:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to retrieve notification data",
         null,
         res,
         req
      );
   }
}

async function getUnreadNotificationCountHandler(req, res) {
   const { employee_id } = req.body;
   if (!validation.validateUserInput(employee_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const unread_inbox = await notificationModel.getUnreadNotificationCount(employee_id);

      response(
         HTTP_STATUS.OK,
         RESPONSE_CODES.SUCCESS,
         "Unread notification count retrieved successfully",
         { unread_inbox },
         res,
         req
      );
   } catch (error) {
      console.error("Failed to retrieve unread notification count:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to retrieve unread notification count",
         null,
         res,
         req
      );
   }
}

async function markNotificationAsRead(req, res) {
   const { employee_id, notification_id } = req.body;
   if (!validation.validateUserInput(employee_id) || !validation.validateUserInput(notification_id)) {
      response(HTTP_STATUS.BAD_REQUEST, RESPONSE_CODES.INVALID_INPUT, RESPONSE_MESSAGES.INVALID_INPUT, {}, res, req);
      return;
   }
   try {
      const result = await notificationModel.markNotificationAsRead(notification_id);

      if (result.affectedRows === 0) {
         response(
            HTTP_STATUS.NOT_FOUND,
            RESPONSE_CODES.NOT_FOUND,
            "Notification not found or already marked as read",
            null,
            res,
            req
         );
      } else {
         response(HTTP_STATUS.OK, RESPONSE_CODES.SUCCESS, "Notification marked as read successfully", {}, res, req);
      }
   } catch (error) {
      console.error("Failed to mark notification as read:", error);
      response(
         HTTP_STATUS.INTERNAL_SERVER_ERROR,
         RESPONSE_CODES.SERVER_ERROR,
         "Failed to mark notification as read",
         null,
         res,
         req
      );
   }
}

module.exports = {
   sendPushNotificationHandler,
   getNotificationInbox,
   getSpecifyNotificationInbox,
   sendPushNotification,
   markNotificationAsRead,
   getUnreadNotificationCountHandler,
};
