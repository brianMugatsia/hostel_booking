import { useEffect, useState } from "react";
import HostelCard from "../components/HostelCard";
import HostelMap from "../components/HostelMap";
import defaultHostels from "../data/hostels";

function Hostels() {
  const [hostels, setHostels] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Load hostels from localStorage + default data
  useEffect(() => {
    const uploaded =
      JSON.parse(localStorage.getItem("uploadedHostels")) || [];
    setHostels([...uploaded, ...defaultHostels]);
  }, []);

  // Derive filtered hostels directly (no extra state)
  const filteredHostels = hostels.filter((h) => {
    let matches = true;

    if (priceFilter) {
      matches = matches && h.price <= parseInt(priceFilter);
    }

    if (locationFilter) {
      matches =
        matches &&
        h.location.toLowerCase().includes(locationFilter.toLowerCase());
    }

    return matches;
  });

  return (
    <div className="container mt-4">
      <h2>Available Hostels Near Maseno University</h2>

      {/* FILTERS */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Max Price (KES)</label>
          <input
            type="number"
            className="form-control"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            placeholder="Enter max price"
          />
        </div>
        <div className="col-md-4">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Search by location"
          />
        </div>
      </div>

      {/* HOSTEL CARDS */}
      <div className="row mt-4">
        {filteredHostels.length === 0 ? (
          <p>No hostels available</p>
        ) : (
          filteredHostels.map((h) => <HostelCard key={h.id} hostel={h} />)
        )}
      </div>

      {/* MAP SECTION */}
      <div className="my-4">
        <HostelMap hostels={filteredHostels} />
      </div>
    </div>
  );
}

export default Hostels;
