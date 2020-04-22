const express= require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 6010;
const bcrypt = require('bcrypt');
const pool = require("../auth/db");


app.use(cors())
app.use(express.json());

app.post('/', async (req, res) => {
    try {
        const { username, email} = req.body;
        let { password } = req.body
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        let newUser = await pool.query(
            'INSERT into auth (username, password, email) VALUES($1, $2, $3) RETURNING *',
            [username, password, email]
        )

        newUser = newUser.rows[0];
        res.json(newUser);

    } catch (error) {
       console.log(error.message);
       res.status(500).json({errors: error}); 
    }
})

app.listen(PORT, () => console.log(`App is currenlty listening on port ${PORT}`));

