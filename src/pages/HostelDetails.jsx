import { useParams, Link } from "react-router-dom";
import defaultHostels from "../data/hostels";

function HostelDetails() {
  const { id } = useParams();

  const uploaded =
    JSON.parse(localStorage.getItem("uploadedHostels")) || [];

  const allHostels = [...uploaded, ...defaultHostels];

  const hostel = allHostels.find(h => h.id === parseInt(id));

  if (!hostel) {
    return (
      <div className="container mt-4">
        <h4>Hostel not found</h4>
        <Link to="/hostels" className="btn btn-success mt-3">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{hostel.name}</h2>
      <p className="text-muted">{hostel.location}</p>
      <h4 className="text-success">Ksh {hostel.price}</h4>

      <p>{hostel.description}</p>

      {/* Media Gallery */}
      <div className="row mt-3">
        {hostel.media ? (
          hostel.media.map((item, i) => (
            <div className="col-md-4 mb-2" key={i}>
              {item.type.startsWith("image") ? (
                <img src={item.url} className="img-fluid rounded shadow" />
              ) : (
                <video src={item.url} controls className="img-fluid rounded shadow" />
              )}
            </div>
          ))
        ) : (
          <img src={hostel.image} className="img-fluid rounded" />
        )}
      </div>

      <Link
        to={`/booking/${hostel.id}`}
        className="btn btn-success btn-lg mt-3"
      >
        Book Now
      </Link>
    </div>
  );
}

export default HostelDetails;
