const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/Auth");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminProductsRoute = require("./routes/Admin/Products");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  allowedHeaders: "Content-Type,Authorization, Cache-Control, Expires, Pragma",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use('/api/admin/products', adminProductsRoute)

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log("mongodb connected successfully"))
  .catch((err) => console.log(err));
// mongoose.connection.on('open', async () => {
//     try {
//       const indexes = await mongoose.connection.db.collection('users').indexes();
//       console.log('Existing indexes:', indexes);

//       // Check if 'tel_1' index exists
//       const telIndex = indexes.find((index) => index.name === 'tel_1');
//       if (telIndex) {
//         // Drop the 'tel_1' index
//         await mongoose.connection.db.collection('users').dropIndex('tel_1');
//         console.log('Unique index on tel removed');
//       } else {
//         console.log('Index "tel_1" does not exist. No action taken.');
//       }
//     } catch (err) {
//       console.error('Error checking or dropping indexes:', err);
//     }
//   });

const PORT = process.env.PORT_NUMBER;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
