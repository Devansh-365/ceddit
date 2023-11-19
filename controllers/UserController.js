const { UserModel } = require("../Models/userModel");
const bcrypt = require("bcrypt");

// Registration Controller
// Registration Controller
const registerUser = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword, // Remember to hash and salt the password for security
      image,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({
        success: true,
        user: savedUser,
        message: "Registration successful.",
      });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Password is valid, you can proceed with your login logic
    return res
      .status(200)
      .json({ success: true, user, message: "Login successful." });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
