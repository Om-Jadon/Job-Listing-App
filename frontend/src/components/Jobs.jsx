import JobCard from "./JobCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/jobsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Jobs() {
  const dispatch = useDispatch();
  const { jobs, loading, error, filters, currentPage, totalPages } =
    useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs({ filters, page: currentPage }));
  }, [dispatch, filters, currentPage]);

  const handlePageChange = (newPage) => {
    dispatch(fetchJobs({ filters, page: newPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FontAwesomeIcon
          icon={faSpinner}
          spin
          size="2x"
          className="text-blue-500"
        />
        <span className="ml-2 text-blue-500">Loading jobs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center font-bold">Error: {error}</div>
    );
  }

  return (
    <div className="md:px-[15%] px-[5%] w-full h-full mx-auto overflow-y-scroll mt-2 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Job Listings</h1>

      {jobs.length === 0 ? (
        <div className="text-center text-gray-500">
          No job listings available.
        </div>
      ) : (
        jobs.map((job) => <JobCard key={job._id} {...job} />)
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } transition-colors duration-300`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
