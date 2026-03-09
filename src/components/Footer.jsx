import { Link } from "react-router-dom";
import { Mail, Phone, Users, HelpCircle, Facebook, Instagram, Twitter } from "lucide-react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">

        <div className="row">

          {/* Brand & Tagline */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold">Maseno Hostel Booking</h5>
            <p className="small">
              Safe, affordable, and verified hostels around Maseno University and Siriba.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/hostels" className="footer-link">Hostels</Link></li>
              <li><Link to="/services" className="footer-link">Services</Link></li>
              <li><Link to="/about" className="footer-link">About Us</Link></li>
              <li><Link to="/login" className="footer-link">Login</Link></li>
              <li><Link to="/register" className="footer-link">Register</Link></li>

            </ul>
          </div>

          {/* Student Services */}
          <div className="col-md-3 mb-4">
            <h6>Student Services</h6>
            <ul className="list-unstyled">
              <li><a href="https://student.maseno.ac.ke" target="_blank" rel="noreferrer" className="footer-link">Maseno Portal</a></li>
              <li><a href="https://elearning.maseno.ac.ke" target="_blank" rel="noreferrer" className="footer-link">E-Learning</a></li>
              <li><a href="https://www.helb.co.ke" target="_blank" rel="noreferrer" className="footer-link">HELB</a></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="col-md-4 mb-4">
            <h6>Contact Us</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center gap-2">
                <Mail size={16} /> info@masenohostel.com
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={16} /> +254 712 345 678
              </li>
              <li className="d-flex align-items-center gap-2">
                <Users size={16} /> Support Team
              </li>
            </ul>

            <div className="d-flex gap-3 mt-2">
              <a href="#" className="text-white"><Facebook size={20} /></a>
              <a href="#" className="text-white"><Instagram size={20} /></a>
              <a href="#" className="text-white"><Twitter size={20} /></a>
            </div>
          </div>

        </div>

        {/* Trust Indicators / Statistics */}
        <div className="row text-center mt-4">
          <div className="col-md-4 mb-3">
            <h3 className="fw-bold mb-0">50+</h3>
            <small>Verified Hostels</small>
          </div>
          <div className="col-md-4 mb-3">
            <h3 className="fw-bold mb-0">200+</h3>
            <small>Happy Students</small>
          </div>
          <div className="col-md-4 mb-3">
            <h3 className="fw-bold mb-0">5★</h3>
            <small>Average Rating</small>
          </div>
        </div>

        <hr className="border-light" />

        <div className="text-center small">
          &copy; {new Date().getFullYear()} Maseno Hostel Booking. All rights reserved.Powered By The BRAHSCO TECH SOLNS.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
