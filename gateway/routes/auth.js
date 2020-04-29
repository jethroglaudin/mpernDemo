const express = require("express");
const router = express.Router();
const axios = require("axios");
const { authServer } = require("../config/defaults");

// @route  POST api/auth
// @desc   authentication route for the gateway
// @access public
router.post("/", async (req, res) => {
  try {
    let response;
    const token = req.header("x-auth-token");
    let body = req.body.reqBody;
    switch (req.body.action) {
      case "registerUser":
        response = await registerUser(body);
        break;
      case "loginUser":
        response = await loginUser(body);
        break;
      case "registerProfile":
        response = await registerProfile(token, body);
        break;
      case "getProfile":
        response = await getProfile(token);
        break;
      default:
        return res.status(404).json({ errors: { action: "Invalid request" } });
    }
    if (response.errors) throw response.errors;
    res.json(response.data);
  } catch (error) {
    console.error("error", error);
    res.status(500).json(error);
  }
});

const registerUser = async (body) => {
  try {
    const response = await axios.post(`${authServer}/api/users/`, body);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const loginUser = async (body) => {
  console.log("gateway action ");

  try {
    const response = await axios.post(`${authServer}/api/users/login/`, body);
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const registerProfile = async (token, body) => {
  // decide if token is confirmed here on microservice
  try {
    const response = axios.post(`${authServer}/api/profiles/`, body, {
      headers: { "x-auth-token": token },
    });
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

const getProfile = async (token) => {
  // decide if token is confirmed here on microservice
  try {
    const response = axios.get(`${authServer}/api/profiles/self/`,  {
      headers: { "x-auth-token": token },
    });
    return response;
  } catch (error) {
    console.error(error.response.data);
    return error.response.data;
  }
};

module.exports = router;
