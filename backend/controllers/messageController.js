import { Conversation } from "../models/convoSchema.js";
import { Message } from "../models/messageSchema.js";
import { io } from "../socket/socket.js";
import { getReceiverSocketId } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConvo = await Conversation.findOne({
            participants:{$all : [senderId, receiverId]}
        });

        if(!gotConvo) {
            gotConvo = await Conversation.create({
                participants:[senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });
        if (newMessage) {
            gotConvo.messages.push(newMessage._id);
        };
        await Promise.all([gotConvo.save(), newMessage.save()]);

        //socketio realtime msg
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        
        return res.status(201).json({
            newMessage
        })

    } catch (error) {
        console.log(error);
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants:{$all: [senderId, receiverId]}
        }).populate("messages");
        return res.status(200).json(conversation?.messages)
    } catch (error) {
        console.log(error);
    }
}