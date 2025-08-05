import Village from "../Models/Village.js";

export const addNewVillageHandler = async (req, res) => {
  try {
    const { name, location, nearerCity, district, tehsil, postalCode } =
      req.body;
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