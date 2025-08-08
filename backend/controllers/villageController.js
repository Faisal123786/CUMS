import User from "../Models/User.js";
import Wallet from "../Models/Wallet.js";
import Village from "../Models/Village.js";

export const addNewVillageHandler = async (req, res) => {
  try {
    const {
      name,
      location,
      nearerCity,
      district,
      tehsil,
      postalCode,
    } = req.body;
    const existingVillage = await Village.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (existingVillage) {
      return res.status(400).json({
        success: false,
        message: "Village with this name already exists.",
      });
    }
    const image = req.file?.filename || null;
    const village = new Village({
      name,
      location,
      nearerCity,
      district,
      tehsil,
      postalCode,
      image,
    });

    await village.save();
    res.status(201).json({
      message: "Village added successfully!",
      data: village,
    });
  } catch (error) {
    console.error("Error adding village:", error);
    res
      .status(500)
      .json({ success: false, message: "Something Went Wrong Try Again" });
  }
};

export const getAllVillagesHandler = async (req, res) => {
  try {
    const villages = await Village.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "All villages fetched successfully!",
      data: villages,
    });
  } catch (error) {
    console.error("Error fetching villages:", error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};

export const getAllVillageDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Village ID is required" });
    }

    const users = await User.find({ area_id: id })
      .populate({
        path: "area_id",
        select: "-password -__v",
      })
      .select("-password");

    let area = null;
    area = await Village.findById(id).select("-__v");
    if (!area) {
      return res.status(404).json({ message: "Village not found" });
    }
    let userWallet = null;
    if (area) {
       userWallet = await Wallet.findOne({
        moderator_id: area.employee_id,
      }).select("-__v");
      if (!area) {
        return res.status(404).json({ message: "Village not found" });
      }
    }

    return res.status(200).json({
      message: "Village and user details fetched successfully",
      data: {
        area,
        user: users || [],
        wallet: userWallet,
      },
    });
  } catch (error) {
    console.error("Error fetching village details:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getAllVillagesWithoutEmployeeIdHandler = async (req, res) => {
  try {
    const villages = await Village.find({ employee_id: { $exists: false } });

    res.status(200).json({
      message: "All villages fetched successfully!",
      data: villages,
    });
  } catch (error) {
    console.error("Error fetching villages:", error);
    res.status(500).json({
      message: "Something Went Wrong",
    });
  }
};
