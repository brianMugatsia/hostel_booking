import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Maseno Hostel Booking
        </Link>

        <ul className="navbar-nav ms-auto">
          {/* Student & Guest */}
          <li className="nav-item">
            <Link className="nav-link" to="/hostels">
              Hostels
            </Link>
          </li>

          {/* OWNER LINKS */}
          {user && user.role === "OWNER" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/list-hostel">
                  List Hostel
                </Link>
              </li>
            </>
          )}

          {/* AUTH LINKS */}
          {!user ? (
            <>
              <li className="nav-item text-muted">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-light ms-3"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
