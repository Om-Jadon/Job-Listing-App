import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
    required: true,
  },
  experience: {
    type: String,
    enum: ["Intern", "Entry-level", "Mid-level", "Senior-level"],
    required: true,
  },
  description: { type: String, required: true },
  requirements: [{ type: String, required: true }],
  responsibilities: [{ type: String, required: true }],
});

const Job = mongoose.model("Job", jobSchema);
export default Job;
