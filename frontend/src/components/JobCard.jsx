import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTag,
  faTrash,
  faBuilding,
  faChevronDown,
  faChevronUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { deleteJob, fetchJobs } from "../features/jobsSlice";

function JobCard({
  _id,
  title,
  company,
  location,
  type,
  description,
  requirements,
  responsibilities,
  experience,
}) {
  const [details, setDetails] = useState(false);
  const [detailsHeight, setDetailsHeight] = useState("0px");
  const detailsRef = useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.admin.token);
  useEffect(() => {
    if (details) {
      setDetailsHeight(`${detailsRef.current.scrollHeight}px`);
    } else {
      setDetailsHeight("0px");
    }
  }, [details]);

  const toggleDetails = () => {
    setDetails(!details);
  };

  const handleDeleteJob = () => {
    dispatch(deleteJob(_id));
  };

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 border border-gray-200 relative overflow-hidden">
      {/* Job Title and Company */}
      <div className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          {token && (
            <button
              onClick={handleDeleteJob}
              className="text-red-500 rounded-full p-2 hover:text-red-800 transition-colors duration-300"
              title="Delete Job"
            >
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </button>
          )}
        </div>
        <div className="text-sm flex items-center mt-2">
          <FontAwesomeIcon icon={faBuilding} className="mr-2" />
          <span className="mr-5">{company}</span>
          <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
          <span className="mr-5">{location}</span>
          <FontAwesomeIcon icon={faTag} className="mr-2" />
          <span>{experience}</span>
        </div>
      </div>

      {/* Short Description */}
      <div className="p-4">
        <p className="text-gray-700 text-sm mb-3">{description}</p>

        {/* Details Section */}
        <div
          ref={detailsRef}
          style={{ height: detailsHeight }}
          className="overflow-hidden transition-height duration-500"
        >
          <div className="text-gray-600">
            <h3 className="font-semibold">Minimum Requirements:</h3>
            <ul className="list-disc ml-5 mb-3">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
            <h3 className="font-semibold mt-2">Responsibilities:</h3>
            <ul className="list-disc ml-5 mb-3">
              {responsibilities.map((res, index) => (
                <li key={index}>{res}</li>
              ))}
            </ul>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center">
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Apply
          </button>
        </div>

        <button
          className="text-blue-500 hover:text-blue-700 font-medium mt-3 flex items-center"
          onClick={toggleDetails}
        >
          {details ? (
            <>
              <FontAwesomeIcon icon={faChevronUp} className="mr-2" />
              Hide Details
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faChevronDown} className="mr-2" />
              View Details
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
