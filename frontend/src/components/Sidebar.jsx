import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { setFilter, clearFilter } from "../features/jobsSlice";
import { useState } from "react";

function Sidebar() {
  const dispatch = useDispatch();
  const { totalJobs, filters } = useSelector((state) => state.jobs);
  const [companyInput, setCompanyInput] = useState("");

  const clearAllFilters = () => {
    dispatch(clearFilter());
    setCompanyInput("");
  };

  const handleSearchChange = (e) => {
    dispatch(setFilter({ search: e.target.value }));
  };

  const handleJobTypeChange = (jobType) => {
    const currentJobTypes = filters.jobType || [];
    const updatedJobTypes = currentJobTypes.includes(jobType)
      ? currentJobTypes.filter((item) => item !== jobType)
      : [...currentJobTypes, jobType];

    dispatch(setFilter({ jobType: updatedJobTypes }));
  };

  const handleExperienceChange = (e) => {
    dispatch(setFilter({ experience: e.target.value }));
  };

  const handleLocationChange = (location) => {
    const currentLocations = filters.location || [];
    const updatedLocations = currentLocations.includes(location)
      ? currentLocations.filter((item) => item !== location)
      : [...currentLocations, location];

    dispatch(setFilter({ location: updatedLocations }));
  };

  const handleCompanyInputChange = (e) => {
    setCompanyInput(e.target.value);
  };

  const handleCompanyAdd = (e) => {
    if (e.key === "Enter" && companyInput.trim()) {
      const updatedCompanies = [
        ...(filters.company || []),
        companyInput.trim(),
      ];
      dispatch(setFilter({ company: updatedCompanies }));
      setCompanyInput("");
    }
  };

  const handleCompanyRemove = (companyToRemove) => {
    const updatedCompanies = filters.company.filter(
      (company) => company !== companyToRemove
    );
    dispatch(setFilter({ company: updatedCompanies }));
  };

  return (
    <div className="w-full h-full p-6 bg-gray-100 border-r border-gray-300">
      <div className="mb-6 flex justify-between items-center">
        <span className="font-bold text-xl">
          <span className="text-green-500 font-extrabold text-2xl">
            {totalJobs}
          </span>{" "}
          Jobs Found
        </span>
        <button
          onClick={clearAllFilters}
          className="text-blue-500 hover:text-blue-700 text-xl font-bold"
        >
          Clear Filters
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search for anything"
          value={filters.search || ""}
          onChange={handleSearchChange}
          className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Job Type</h3>
        <div className="flex flex-col space-y-3">
          {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
            <label className="flex items-center" key={type}>
              <input
                type="checkbox"
                checked={filters.jobType?.includes(type)}
                onChange={() => handleJobTypeChange(type)}
                className="mr-3"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Experience</h3>
        <select
          value={filters.experience || ""}
          onChange={handleExperienceChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select experience</option>
          <option value="Intern">Intern</option>
          <option value="Entry-level">Entry Level</option>
          <option value="Mid-level">Mid Level</option>
          <option value="Senior-level">Senior Level</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Location</h3>
        <div className="flex flex-col space-y-3">
          {["Remote", "In-Office", "Hybrid"].map((location) => (
            <label className="flex items-center" key={location}>
              <input
                type="checkbox"
                checked={filters.location?.includes(location)}
                onChange={() => handleLocationChange(location)}
                className="mr-3"
              />
              {location}
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Company</h3>
        <input
          type="text"
          placeholder="Search companies"
          value={companyInput}
          onChange={handleCompanyInputChange}
          onKeyDown={handleCompanyAdd}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.company?.map((company) => (
            <span
              key={company}
              className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg flex items-center space-x-2"
            >
              <span>{company}</span>
              <button
                onClick={() => handleCompanyRemove(company)}
                className="text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
