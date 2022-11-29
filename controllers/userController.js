const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const env = require("dotenv");
env.config();

const signup = async (req, res) => {
  const { username, password } = req.body;
  let success = false;

  try {
    const foundUser = await User.findOne({ username });

    if (foundUser) {
      return res
        .status(401)
        .json({ success, error: "This username is already taken." });
    } else {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: secPass,
      });

      await newUser.save();

      const data = {
        user: {
          id: newUser._id,
        },
      };

      const jwtData = jwt.sign(data, process.env.SECRET);

      success = true;
      return res.status(201).json({ success, token: jwtData });
    }
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  let success = false;

  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res
        .status(404)
        .json({ success, error: "This user does not exist." });
    } else {
      const passwordCompare = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!passwordCompare) {
        return res.status(404).json({ success, error: "Wrong credentials." });
      } else {
        const data = {
          user: {
            id: foundUser._id,
          },
        };

        const jwtData = jwt.sign(data, process.env.SECRET);

        success = true;
        return res.status(201).json({ success, token: jwtData });
      }
    }
  } catch (err) {
    return res.status(500).json({ success, error: err.message });
  }
};

module.exports = { signup, login };
