const express = require('express');
const app = express();
const cors = require('cors');
const auth = require("./routes/auth");
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", auth);

app.listen(PORT, () => console.log(`App is currently listening on port ${PORT}`));

// gateway >> auth service
// frontend >> gateway >> authservice