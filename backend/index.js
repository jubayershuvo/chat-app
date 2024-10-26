import app from './src/App.js'
import { cors_origin, port } from './src/constans.js';
import db_connect from './src/db/confg.js';
import {Server} from 'socket.io'

app.get('/',(req, res)=>{
    return res.status(200).json({success:true, message:"Server running"});
});

app.get('*',(req, res)=>{
    return res.status(404).json({success:false, message:"Api route dosen't exist..!"});
});
const server = app.listen(port,()=>{
    console.log(`Your server running at http://localhost:${port}`);
    db_connect();
});

const io = new Server(server, {
    cors: {
      origin: cors_origin, // Adjust this based on your client URL
      methods: ["GET", "POST"],
      credentials: true
    }
  });

// Handle Socket.IO connections

// Handle Socket.IO connections
io.on('connection', (socket) => {
  
    socket.on('setup', (userData) => {
      socket.join(userData._id);  // Use user data for room or other purposes
      socket.emit('connected');
    });
    socket.on("join chat",(room)=>{
        socket.join(room)
    });
    socket.on('typing',(room)=>{
      socket.in(room).emit('typing')
    })
    socket.on('stop typing',(room)=>{
      socket.in(room).emit('stop typing')
    })

    socket.on('new message',(newMessage)=>{
      var chat = newMessage.chat;
      if(!chat.users || chat.users.length === 0){
        return
      }

      chat.users.forEach(user => {
        if(user._id == newMessage.sender._id){
          return
        }
        socket.in(user._id).emit('message receved', newMessage)
      });
    })

  
    // Handle disconnection
    socket.on('disconnect', () => {
    });

  });