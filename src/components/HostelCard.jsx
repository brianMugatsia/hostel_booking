import { Link } from "react-router-dom";

function HostelCard({ hostel }) {
  const cover =
    hostel.media && hostel.media.length > 0
      ? hostel.media[0]
      : null;

  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        {cover ? (
          cover.type.startsWith("image") ? (
            <img src={cover.url} className="card-img-top" />
          ) : (
            <video src={cover.url} className="card-img-top" muted />
          )
        ) : (
          <img src={hostel.image} className="card-img-top" />
        )}

        <div className="card-body">
          <h5>{hostel.name}</h5>
          <p>{hostel.location}</p>
          <p><strong>Ksh {hostel.price}</strong></p>

          <Link
            to={`/hostels/${hostel.id}`}
            className="btn btn-success"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HostelCard;
