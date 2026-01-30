import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // Get current user and uploaded hostels once
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const uploaded = JSON.parse(localStorage.getItem("uploadedHostels")) || [];

  // Initialize state directly from localStorage
  const [myHostels, setMyHostels] = useState(() => {
    if (!currentUser || currentUser.role !== "OWNER") return [];
    return uploaded.filter((h) => h.ownerEmail === currentUser.email);
  });

  // Delete hostel function
  const handleDelete = (id) => {
    if (!window.confirm("Delete this hostel?")) return;

    const updated = uploaded.filter((h) => h.id !== id);
    localStorage.setItem("uploadedHostels", JSON.stringify(updated));

    const mine = updated.filter((h) => h.ownerEmail === currentUser?.email);
    setMyHostels(mine);
  };

  // Protect route (only landlords allowed)
  useEffect(() => {
    if (!currentUser || currentUser.role !== "OWNER") {
      navigate("/login");
    }
  }, [navigate, currentUser]);

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">My Hostels</h3>
        <Link to="/list-hostel" className="btn btn-success">
          + Add New Hostel
        </Link>
      </div>

      {myHostels.length === 0 ? (
        <div className="alert alert-info text-center">
          <p className="mb-2">You haven’t listed any hostels yet.</p>
          <Link to="/list-hostel" className="btn btn-success">
            List Your First Hostel
          </Link>
        </div>
      ) : (
        <div className="row">
          {myHostels.map((hostel) => {
            const totalRooms = hostel.rooms?.length || 0;
            const availableRooms =
              hostel.rooms?.filter((r) => r.available).length || 0;

            return (
              <div className="col-md-4 mb-4" key={hostel.id}>
                <div className="card shadow-sm h-100">
                  {hostel.media?.length > 0 && (
                    <img
                      src={hostel.media[0].url}
                      className="card-img-top"
                      alt={hostel.name}
                      style={{ height: "180px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <h5 className="card-title">{hostel.name}</h5>
                    <p className="text-muted mb-1">{hostel.location}</p>
                    <p className="fw-semibold text-success">Ksh {hostel.price}</p>
                    <p className="small text-muted">
                      Rooms: {availableRooms}/{totalRooms} available
                    </p>
                    <span
                      className={`badge ${
                        availableRooms === 0 ? "bg-danger" : "bg-success"
                      }`}
                    >
                      {availableRooms === 0 ? "Fully Booked" : "Available"}
                    </span>
                  </div>

                  <div className="card-footer bg-white border-0 d-flex gap-2">
                    <Link
                      to={`/hostel/${hostel.id}`}
                      className="btn btn-outline-success btn-sm w-100"
                    >
                      View
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => handleDelete(hostel.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
