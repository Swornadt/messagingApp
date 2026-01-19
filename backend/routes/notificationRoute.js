// notificationRoute.js
import express from "express";
import admin from "firebase-admin";

const router = express.Router();

// Endpoint to send a notification
router.post("/send-notification", async (req, res) => {
    const { token, title, body } = req.body;

    if (!token || !title || !body) {
        return res.status(400).json({ message: "Token, title, and body are required." });
    }

    const message = {
        data: {
            title,
            body,
        },
        token,
    };

    try {
        const response = await admin.messaging().send(message);
        res.status(200).json({ message: "Notification sent successfully", response });
    } catch (error) {
        res.status(500).json({ message: "Error sending notification", error });
    }
});

export default router;
