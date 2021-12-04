const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
app.use(cors());
const port = process.env.PORT || 5000;
const dbconfig = require("./db");
const roomsroute = require("./routes/roomsRoute");
const userroute = require("./routes/usersRoute");
const bookroom = require("./routes/bookingRoute");
app.use(express.json());
app.use("/api/rooms", roomsroute);
app.use("/api/users", userroute);
app.use("/api/bookings", bookroom);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("sheyroom/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "sheyroom/build/index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is runing on port ${port} `);
});
