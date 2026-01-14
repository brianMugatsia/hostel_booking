import { useEffect, useState } from "react";
import HostelCard from "../components/HostelCard";
import HostelMap from "../components/HostelMap";
import defaultHostels from "../data/hostels";

function Hostels() {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const uploaded =
      JSON.parse(localStorage.getItem("uploadedHostels")) || [];

    setHostels([...uploaded, ...defaultHostels]);
  }, []);

  return (
    <div className="container mt-4">
      <h2>Available Hostels Near Maseno University</h2>

      {/* HOSTEL CARDS */}
      <div className="row mt-4">
        {hostels.length === 0 ? (
          <p>No hostels available</p>
        ) : (
          hostels.map((h) => <HostelCard key={h.id} hostel={h} />)
        )}
      </div>

      {/* MAP SECTION */}
      <div className="my-4">
        <HostelMap hostels={hostels} />
      </div>
    </div>
  );
}

export default Hostels;
