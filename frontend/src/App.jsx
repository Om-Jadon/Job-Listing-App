import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Jobs from "./components/Jobs";
import TopBar from "./components/TopBar";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="flex flex-col w-screen">
      <div className="h-[7vh]">
        <TopBar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex h-[93vh] relative">
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 md:w-1/4 w-3/4 bg-white border-r transition-transform transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:relative md:block z-10`}
        >
          <Sidebar />
        </div>
        <div className="flex-grow w-3/4 h-[90vh] pb-4">
          <Jobs />
        </div>
      </div>
    </div>
  );
}
