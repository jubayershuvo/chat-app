import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { Chat } from '../models/chatModel.js';
import { Message } from '../models/messageModel.js';

export const getMessage = asyncHandler(async (req, res) => {
    try {
        const { chatId } = req.params; // Get the chat ID from request parameters

        // Check if chatId is provided
        if (!chatId) {
            throw new ApiError(400, 'Chat ID not found..!');
        }

        // Fetch messages for the chat and populate necessary fields
        const messages = await Message.find({ chat: chatId })
            .populate('sender', 'fullname avatar email username')
            .populate('chat');

        // Check if messages exist for the given chatId
        if (!messages || messages.length === 0) {
            return res.status(404).json(new ApiResponse(404, 'No messages found for this chat.', []));
        }

        // Return messages if found
        return res.status(200).json(new ApiResponse(200, 'All messages retrieved successfully!', messages));

    } catch (error) {
        // Catch and handle any errors that occur
        return res.status(error.statusCode || 500).json({
            status: error.statusCode || 500,
            success: false,
            message: error.message || 'An error occurred while retrieving the messages.'
        });
    }
});

export const sendMessage = asyncHandler(async (req, res) => {
    try {
        const { textMessage, chatId } = req.body;
        const userId = req.user._id;

        // Check for missing fields
        if (!textMessage || !chatId) {
            throw new ApiError(400, 'Something is missing..!');
        }

        // Create a new message object
        let newMessage = {
            sender: userId,
            content: textMessage,
            chat: chatId,
        };

        try {
            // Create the message
            let message = await Message.create(newMessage);

            // Re-fetch the message as a Mongoose document and populate fields
            message = await Message.findById(message._id)
                .populate("sender", "fullname avatar")
                .populate("chat");
            message = await message.populate({
                path: 'chat.users',
                select: 'fullname avatar email username'
            })

            // Update the latest message in the chat
            await Chat.findByIdAndUpdate(chatId, { latestMessage: message });

            // Return the successful response with the message data
            return res.status(200).json(new ApiResponse(200, 'Message sent!', message));

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                status: error.statusCode || 500,
                success: false,
                message: error.message || 'An error occurred while sending the message.'
            });
        }

    } catch (error) {
        return res.status(error.statusCode || 500).json({
            status: error.statusCode || 500,
            success: false,
            message: error.message || 'An unexpected error occurred.'
        });
    }
});
