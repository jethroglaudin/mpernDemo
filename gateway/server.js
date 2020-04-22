const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`App is currently listening on port {PORT}`));