const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const dotenv = require("dotenv");
dotenv.config();


const mongoose = require('mongoose');
const mongodb = require('mongodb');
const isAuth = require('./middleware/is-auth');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const https = require("https");
const io = require('socket.io')(server);
let cron = require('node-cron');

const { spawn, exec } = require("child_process");
const { mongoExport } = require('mongoback');
const fs = require('fs');
const AWS = require('aws-sdk');

const User = require('./models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

// cron.schedule('*/5 * * * * *', () => {
//   let cronExp = 'every 5 seconds..';
//   graphQlResolvers.cronTest(cronExp);
// });
// cron.schedule(' */1 * * * *', () => {
//   let cronExp = 'every 1 Minute...'
//   graphQlResolvers.cronTest(cronExp);
// });
// cron.schedule('21 13 15 6 1', () => {
//   let cronExp = 'Monday 15/06, 13:21...'
//   graphQlResolvers.cronTest(cronExp);
// },
// {
//    scheduled: true,
//    timezone: "America/Bogota"
//  });


const dbs = {
  local: 'mongodb://localhost:27017/duel_tactics',
  // atlas: `mongodb+srv://${process.env.ATLAS_A}:${process.env.ATLAS_B}@${process.env.ATLAS_C}/test?retryWrites=true&w=majority`,
  // atlasProd: `mongodb+srv://${process.env.ATLAS_A}:${process.env.ATLAS_B}@${process.env.ATLAS_C}/production?retryWrites=true&w=majority`
}
let dbUri = dbs.local;

function dbDisconnect () {

  mongoose.disconnect()

}

function dbConnect () {
  console.log('connecting to mongoose');

  mongoose.connect(dbUri,
  {
    // auto_reconnect: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
    .then(() => {
      console.log(`
        DB connected... Now Serving on Port: ${process.env.PORT}
        `);
      app.listen(process.env.PORT);
      // app.listen(process.env.PORT, '192.168.0.9');

    })
    .catch(err => {
      console.log('mongoose connect error',err);
  });

}

dbConnect ();


let connectedClients = [];


io.on('connection', (socket) => {

    socket.on('unauthorizedClientConnect', function(data) {
      console.log("a wild client appeared...socket..",socket.id);
    });
    socket.on('notification_subscribe', function(data) {
        console.log('a domestic client appeared...socket...'+socket.id+'...user...'+data.user);
        console.log('joining private room', data.room);
        socket.join(data.room);
        connectedClients.push({socket: socket.id, user: data.user})
        console.log('connectedClients',connectedClients);
        userOnline(data.user);
        io.to(data.room).emit('send_notification',{msg:'listening for notifications'})
        // socket.emit("test", {msg: "hello logged in user"})
    });

    socket.on('admin_subscribe', function() {
      console.log('joining admin room');
      socket.join('admin_channel');
      // socket.emit("test", {msg: "you are subscribed to admin room/channel"})
      io.to('admin_channel').emit('admin_msg', {msg:'testing admin channel...'})
    })
    socket.on('admin_msg', function(data) {
      console.log('sending admin msg server');
      io.to('admin_channel').emit('admin_msg', {msg:data})
    })

    socket.on('send_notification', function(data) {
      console.log('sending individual notification', data.room);
      socket.broadcast.to(data.room).emit('receive_notification', {msg:data.data});
    });

    socket.on('send_message', function(data) {
      console.log('sending private room post', data.room);
      socket.broadcast.to(data.room).emit('conversation private post', {
          message: data.message
      });
      socket.emit("MESSAGE_SENT", {msg: "message sent!!"});
      console.log('sender confirmation sent');
    });

    socket.on('disconnect', function(){
      let clientToRemove = connectedClients.find(x => x.socket === socket.id);
      if (clientToRemove === undefined) {
        console.log('a wild client disappeared', socket.id);
      } else {
        console.log('a domestic client disappeared...',clientToRemove);
        let connectedClientsUpdate = connectedClients.filter(x => x.socket !== socket.id)
        connectedClients = connectedClientsUpdate;
        console.log('connectedClients', connectedClients);
        userOffline(clientToRemove.user);
      }
    })

});

io.on('disconnect', (socket) => {
  console.log("a wild client disappeared..");
});

server.listen(process.env.SOCKET_PORT, function (err) {
  if (err) throw err
  console.log(`
    socket.io listening on port ${process.env.SOCKET_PORT}
    `)
})

app.use(
  express.static(path.join(__dirname, "./frontend_canvas/build"))
);
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

exports.appSocket = appSocket;
