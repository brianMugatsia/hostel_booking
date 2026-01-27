import { useParams, Link } from "react-router-dom";
import defaultHostels from "../data/hostels";
import "./HostelDetails.css"


function HostelDetails() {
  const { id } = useParams();
  const uploaded = JSON.parse(localStorage.getItem("uploadedHostels")) || [];
  const allHostels = [...uploaded, ...defaultHostels];
  const hostel = allHostels.find((h) => h.id === parseInt(id));

  if (!hostel) {
    return (
      <div className="container mt-5 text-center">
        <h4>Hostel not found</h4>
        <Link to="/hostels" className="btn btn-success mt-3">
          Back to Hostels
        </Link>
      </div>
    );
  }

  // Booking Status
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  const isBooked = bookings.some((b) => b.hostelId === hostel.id);

  let statusText = "Not Booked";
  let statusClass = "badge bg-success";

  if (hostel.taken) {
    statusText = "Taken";
    statusClass = "badge bg-danger";
  } else if (isBooked) {
    statusText = "Booked";
    statusClass = "badge bg-warning text-dark";
  }

  return (
    <div className="container mt-5">
      {/* Hostel Card */}
      <div className="hostel-card p-4 shadow rounded">
        <div className="row">
          {/* Left Column: Images */}
          <div className="col-md-6 mb-3 mb-md-0">
            {hostel.media ? (
              <div className="row g-2">
                {hostel.media.map((item, i) => (
                  <div className="col-6" key={i}>
                    {item.type.startsWith("image") ? (
                      <img
                        src={item.url}
                        alt={`Media ${i + 1}`}
                        className="img-fluid rounded shadow-sm hostel-media"
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls
                        className="img-fluid rounded shadow-sm hostel-media"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <img
                src={hostel.image}
                alt={hostel.name}
                className="img-fluid rounded shadow-sm w-100 hostel-media"
              />
            )}
          </div>

          {/* Right Column: Info */}
          <div className="col-md-6">
            <h2 className="fw-bold">{hostel.name}</h2>
            <p className="text-muted fs-5">{hostel.location}</p>
            <h4 className="text-success fw-semibold">Ksh {hostel.price}</h4>

            <hr />

            <p className="mt-3">{hostel.description}</p>

            {/* Booking Status */}
            <p className="mt-3">
              <span className={statusClass}>{statusText}</span>
            </p>

            {/* Book Button */}
            <Link
              to={`/booking/${hostel.id}`}
              className="btn btn-success btn-lg mt-2"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HostelDetails;
