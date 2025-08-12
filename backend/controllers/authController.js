import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { emailSender } from "../services/email.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    emailSender(
      email,
      `<a href="http://localhost:5000/api/auth/activate/${email}">Click Here To Activate Your Account</a>`
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Account Not Found" });
    }
    if (role !== user.role) {
      return res.status(400).json({ message: "Invallid Role" });
    }
    if (user.active_account === false) {
      return res.status(400).json({ message: "Activate Your Account" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name:user.name, email:user.email,...(user.area_id && { area_id: user.area_id }) },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true, secure: true });
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const activateUser = async (req, res) => {
  try {
    const email = req.params.id;
    const user = await User.findOneAndUpdate(
      { email },
      { active_account: true },
      { new: true }
    );

    const redirectURL = user
      ? "http://localhost:3000/login?activated=true"
      : "http://localhost:3000/login?activated=error";

    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Activating...</title>
          <meta http-equiv="refresh" content="0; URL='${redirectURL}'" />
          <script>
            window.location.href = "${redirectURL}";
          </script>
        </head>
        <body>
          <p>Activating account... If not redirected, <a href="${redirectURL}">click here</a>.</p>
        </body>
      </html>
    `);
  } catch (err) {
    console.error("Activation Error:", err);
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
          <meta http-equiv="refresh" content="0; URL='http://localhost:3000/login?activated=false'" />
          <script>
            window.location.href = "http://localhost:3000/login?activated=false";
          </script>
        </head>
        <body>
          <p>There was an error. <a href="http://localhost:3000/login?activated=false">Click here</a> if you're not redirected.</p>
        </body>
      </html>
    `);
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, 
    sameSite: "strict",
    path: "/",         
  });

  console.log("Original token:", req.cookies.token);

  res.status(200).json({ message: "Cookie cleared" });
}


