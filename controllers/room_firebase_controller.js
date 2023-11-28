const admin = require("firebase-admin");

const serviceAccount = require("../acamobiled-firebase-adminsdk.json");

// Initialize Firebase Admin SDK with your service account credentials
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   // Replace `serviceAccount` with the path to your service account JSON file
});

async function sendPushNotificationHandler(req, res) {
   const { deviceToken, title, body, imageUrl, data } = req.body;

   if (!deviceToken || !title || !body || !imageUrl) {
      res.status(400).json({ error: "Missing required parameters" });
      return;
   }

   const message = {
      notification: {
         title: title,
         body: body,
      },
      android: {
         notification: {
            imageUrl: imageUrl,
         },
      },
      data: data,
      token: deviceToken,
   };

   try {
      const response = await admin.messaging().send(message);
      console.log("Push notification sent successfully:", response);
      res.status(200).json({ message: "Push notification sent successfully" });
   } catch (error) {
      console.error("Error sending push notification:", error);
      res.status(500).json({ error: "Failed to send push notification" });
   }
}

module.exports = { sendPushNotificationHandler };
