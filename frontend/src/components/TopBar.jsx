import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, logoutAdmin, clearError } from "../features/adminSlice";

function TopBar({ toggleSidebar }) {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  const dispatch = useDispatch();
  const {
    error,
    token,
    username: adminUsername,
  } = useSelector((state) => state.admin);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const openModal = () => {
    setModalOpen(true);
    setMenuOpen(false);
    setUsername("");
    setPassword("");
    setSuccessMessage(null);
  };

  const closeModal = () => {
    dispatch(clearError());
    setModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin());
    setMenuOpen(false);
    setSuccessMessage(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ username, password }));

    if (loginAdmin.fulfilled.match(result)) {
      setSuccessMessage("Logged in successfully!");
      setTimeout(() => {
        setModalOpen(false);
      }, 1000);
    } else {
      setSuccessMessage(null);
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-md p-4 flex items-center justify-between relative">
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">JobFinder</span>
      </div>

      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="md:hidden text-gray-600 hover:text-gray-800 mr-6"
        >
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>

        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-md z-10 transition-transform transform origin-top-right scale-95">
              {token ? (
                <>
                  <span className="block px-4 py-2 text-gray-700 font-semibold">
                    {adminUsername}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={openModal}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                >
                  Login as Admin
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Login */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Login
                </button>
              </div>
            </form>
            {error && <p className="mt-4 text-center text-red-500">{error}</p>}
            {successMessage && (
              <p className="mt-4 text-center text-green-500">
                {successMessage}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopBar;
