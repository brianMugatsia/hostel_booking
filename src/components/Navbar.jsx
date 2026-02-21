import { Link, useNavigate } from "react-router-dom";
import {
  BedDouble,
  Bus,
  UtensilsCrossed,
  CreditCard,
  Users,
  HelpCircle,
} from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-danger navbar-dark fixed-top shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-semibold" to="/">
          Maseno Hostel Booking
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar content */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            {/* Hostels */}
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center text-white gap-1" to="/hostels">
                <BedDouble size={18} />
                Hostels
              </Link>
            </li>

            {/* OWNER */}
            {user?.role === "OWNER" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/list-hostel">
                    List Hostel
                  </Link>
                </li>
              </>
            )}

            {/* SINGLE-COLUMN DROPDOWN */}
            <li className="nav-item dropdown dropdown-hover">
              <button
                className="nav-link dropdown-toggle btn btn-link text-white"
                data-bs-toggle="dropdown"
              >
                Services
              </button>

              <div className="dropdown-menu dropdown-menu-end mega-menu shadow-sm p-2">
                <h6 className="dropdown-header">Platform Services</h6>

                {/* Travel submenu */}
                <li className="dropdown">
                  <a
                    className="dropdown-item dropdown-toggle d-flex gap-2"
                    data-bs-toggle="dropdown"
                  >
                    Travel
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item text-danger" href="https://easycoachkenya.com/" target="_self" rel="noreferrer">
                        Easy Coach <Bus size={16} />
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item text-primary" href="https://theguardian.co.ke/" target="_blank" rel="noreferrer">
                        Guardian Angel <Bus size={16} />
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item text-warning" href="https://www.enacoach.co.ke/" target="_blank" rel="noreferrer">
                        Ena Coach <Bus size={16} />
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link className="dropdown-item d-flex gap-2" to="https://www.munchify.co.ke/" target="_blank">
                    <UtensilsCrossed size={16} /> Food Ordering
                  </Link>
                </li>

                <li>
                  <Link className="dropdown-item d-flex gap-2" to="/payments">
                    <CreditCard size={16} /> Payments
                  </Link>
                </li>

                <hr className="dropdown-divider" />

                <h6 className="dropdown-header">Student Services</h6>
                <li>
                  <a className="dropdown-item" href="https://student.maseno.ac.ke" target="_blank" rel="noreferrer">
                    Maseno Student Portal
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="https://elearning.maseno.ac.ke" target="_blank" rel="noreferrer">
                    E-Learning
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="https://www.helb.co.ke" target="_blank" rel="noreferrer">
                    HELB
                  </a>
                </li>
                <li>
                  <Link className="dropdown-item d-flex gap-2" to="/community">
                    <Users size={16} /> Student Community
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item d-flex gap-2" to="/support">
                    <HelpCircle size={16} /> Help & Support
                  </Link>
                </li>
              </div>
            </li>

            {/* AUTH */}
            {!user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item ms-lg-2">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-light btn-sm"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;