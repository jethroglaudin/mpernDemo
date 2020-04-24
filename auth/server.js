const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/user");
const profiles = require("./routes/profile");

const PORT = process.env.PORT || 6010;


app.use(cors());
app.use(express.json());
app.use("/api/users/", users);
app.use("/api/profiles", profiles);


app.listen(PORT, () =>
  console.log(`App is currenlty listening on port ${PORT}`)
);
