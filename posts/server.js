const express = require("express");
const app = express();
const cors = require('cors');

app.use(cours());
app.use(express.json());

const port = process.env.PORT || 6020;

app.listen(port, () => console.log(`app is currenly listening on port ${port}`));