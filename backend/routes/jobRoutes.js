import express from "express";
import Job from "../models/Job.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      search,
      location,
      jobType,
      experience,
      company,
      page = 1,
      limit = 10,
    } = req.query;
    let query = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { company: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { type: { $regex: searchRegex } },
        { experience: { $regex: searchRegex } },
        { requirements: { $elemMatch: { $regex: searchRegex } } },
        { responsibilities: { $elemMatch: { $regex: searchRegex } } },
      ];
    }

    if (location) {
      const locationArray = location.split(",");
      query.$or = locationArray.map((loc) => {
        if (loc === "Remote") {
          return { location: { $regex: /Remote/ } };
        } else if (loc === "Hybrid") {
          return { location: { $regex: /Hybrid/ } };
        } else if (loc === "In-Office") {
          return { location: { $not: { $regex: /(Remote|Hybrid)/ } } };
        }
      });
    }

    if (jobType) {
      const jobTypeArray = jobType.split(",");
      query.type = { $in: jobTypeArray };
    }

    if (experience) {
      query.experience = experience;
    }

    if (company) {
      const companyArray = company
        .split(",")
        .map((comp) => new RegExp(comp, "i"));
      query.company = { $in: companyArray };
    }

    const jobs = await Job.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments(query);
    const totalPages = Math.ceil(totalJobs / limit);

    res.json({ jobs, totalPages, totalJobs, currentPage: Number(page) });
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job) {
      res.json(job);
    } else {
      res.status(404).json({ error: "Job not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// Admin routes

router.post("/", authMiddleware, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ error: "Failed to create job" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

export default router;
