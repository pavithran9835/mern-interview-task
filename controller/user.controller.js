const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//register validation
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//login validation
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).max(12).required(),
});

exports.register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "Your Account Created",
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email Doesnt Exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const { _id, name } = user;

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_TOKEN, {
    expiresIn: "7d",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  res.status(200).json({
    message: "Logged In",
    token: accessToken,
    refreshToken,
    user: { _id, name },
  });
};

exports.updateUser = async (req, res) => {
  const id = req.user._id;

  User.findOne({ _id: id }, (err, user) => {
    if (!user) {
      res.status(400).json({ error: "User Not Found" });
    } else {
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;
      user.age = req.body.age;
      user.gender = req.body.gender;
      user.education = req.body.education;
      user.mobile = req.body.mobile;
      user.address = req.body.address;
      user.state = req.body.state;
      user.nationality = req.body.nationality;
    }

    user
      .save()
      .then((myData) => {
        res.status(200).json({ message: "Profile Updated" });
      })
      .catch((err) => {
        res.status(400).json({ err });
      });
  });
};
