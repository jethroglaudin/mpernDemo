const express = require("express");
const router = express.Router();
const pool = require("../db");
const auth = require("../middleware/auth");

//@route POST api/profiles
// @desc register profile to looged in user
// @access private

router.post("/", auth, async (req, res) => {
    try {
        const { firstName, lastName, avatar, github, cohort } = req.body;
        

        let newProfile = await pool.query(
            "INSERT into profile (aid, first_name, last_name, avatar, github, cohort) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
            [req.user.id, firstName, lastName, avatar, github, cohort]
        );

        newProfile = newProfile.rows[0];
        res.json(newProfile);
        
    } catch (error) {
       console.error(error.message);
       res.status(400).json({ errors: error }); 
    }
})

//@route GET api/profiles/self
// @desc get profile data of the logged in user
// @access private

module.exports = router;