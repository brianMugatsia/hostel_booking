import { Link } from "react-router-dom";
import hostel1 from "../assets/hostel1.png";
import hostel2 from "../assets/hostel2.png";
import hostel3 from "../assets/hostel3.png";
import "./Home.css";

function Home() {
  return (
    <>
      {/* Carousel with Hero Overlay */}
      <div id="hostelCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={hostel1} className="d-block w-100 carousel-img" alt="Hostel 1" />
          </div>
          <div className="carousel-item">
            <img src={hostel2} className="d-block w-100 carousel-img" alt="Hostel 2" />
          </div>
          <div className="carousel-item">
            <img src={hostel3} className="d-block w-100 carousel-img" alt="Hostel 3" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#hostelCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#hostelCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

        {/* Hero Overlay */}
        <div className="carousel-caption hero-overlay d-flex flex-column justify-content-center align-items-center text-center">
          <h1 className="display-5 fw-bold text-white shadow-text">
            Find Hostels Near Maseno University
          </h1>
          <p className="lead mt-3 text-white shadow-text">
            Safe, affordable and verified hostels around Maseno & Siriba
          </p>
          <Link to="/hostels" className="btn btn-light btn-lg mt-3">
            View Available Hostels
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Verified Hostels</h5>
                <p className="card-text">
                  All hostels are checked for security, water, and electricity.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Affordable Prices</h5>
                <p className="card-text">
                  Compare prices and choose a hostel that fits your budget.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Easy Booking</h5>
                <p className="card-text">
                  Book your hostel online in minutes with no stress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="container text-center my-5">
        <h3>Are you a Hostel Owner?</h3>
        <p>List your hostel and reach Maseno University students easily.</p>
        <Link to="/list-hostel" className="btn btn-success">List Your Hostel</Link>
      </div>
    </>
  );
}

export default Home;
