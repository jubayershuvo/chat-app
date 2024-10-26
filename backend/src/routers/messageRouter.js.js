import express from 'express';
const messageRouter = express.Router();
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { getMessage, sendMessage } from '../controllers/messageController.js';

messageRouter.route('/').post(
    verifyJWT,
    sendMessage
)
messageRouter.route('/:chatId').get(
    verifyJWT,
    getMessage
)

export default messageRouter;