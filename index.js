const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");

const app=express();
const port= 4500 || process.env.PORT ;


const users=[{}];
const newUsers=[{}];

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Server is running");
})

const server=http.createServer(app);

const io=socketIO(server);

io.on("connection",(socket)=>{
    // console.log("New Connection");

    socket.on('joined',({user})=>{
          users[socket.id]=user;
        //   console.log(`${user} has joined `);
        socket.broadcast.emit('userJoined',{user:"🫡",message:` ${user} has joined`});
          io.emit('welcome',{user:"🫡",message:`Hi ${user} welcome to my ChatApp`})
    


    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('disconnect',()=>{
          socket.broadcast.emit('leave',{user:"😞",message:`${user}  has left`});
        // console.log(`user left`);
    })

})
});


server.listen(port,()=>{
    console.log(`Surver is running on port ${port}`);
})