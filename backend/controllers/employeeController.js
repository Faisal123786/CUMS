import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import Village from "../Models/Village.js";
import Wallet from "../Models/Wallet.js";

export const registerEmployee = async (req, res) => {
  const { name, email, password, role, area } = req.body;

  try {
    const existingEmployee = await User.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new User({
      name,
      email,
      password: hashedPassword,
      role,
      area_id: area,
    });

    await newEmployee.save();
    await Village.findByIdAndUpdate(
      area,
      { employee_id: newEmployee._id },
      { new: true, useFindAndModify: false }
    );
    await User.findByIdAndUpdate(
      newEmployee._id,
      { area_id: area },
      { new: true }
    );
    if (role === "Employee") {
      const newWallet = new Wallet({
        moderator_id: newEmployee._id,
        balance: 0,
      });
      await newWallet.save();
    }

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Error registering employee:", error);
    res.status(500).json({ message: "Something Went Wrong" });
  }
};

export const getAllEmployeeHandler = async (req, res) => {
  try {
    const employees = await User.find({ role: "Employee" }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      message: "All Employees fetched successfully!",
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching Employees:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
