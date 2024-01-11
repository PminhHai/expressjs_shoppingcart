const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const paymentRoutes = require('./routes/payment');
const db = require('./config/db');
const socketIO  = require('socket.io');
const http = require('http');

const server = http.createServer(app);
const io = socketIO(server);

//Connect to db
db.connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({ message: "Welcome to CRUD application." });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

//Route init
app.use('/api/product/', productRoutes);
app.use('/api/cart/',cartRoutes);
app.use('/api/payment/',paymentRoutes);

// Connect socket.io to server
io.on('connection', (socket) => {
  console.log('A client connected');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});