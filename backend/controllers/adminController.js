import User from "../Models/User.js";
import Village from "../Models/Village.js";

export const getAllDonorEmplyeeAccepterCountHandler = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $match: {
          role: { $in: ["Employee", "Donor", "Accepter"] } 
        }
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }, 
          users: { $push: "$$ROOT" }
        }
      }
    ]);
    const donorsData = result.find(r => r._id === "Donor") || { users: [], count: 0 };
    const employeesData = result.find(r => r._id === "Employee") || { users: [], count: 0 };
    const acceptersData = result.find(r => r._id === "Accepter") || { users: [], count: 0 };
      const villageCount = await Village.countDocuments();

    res.status(200).json({
      donorsCount: donorsData.count,
      employeesCount: employeesData.count,
      acceptersCount: acceptersData.count,
      villageCount
    });

  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
