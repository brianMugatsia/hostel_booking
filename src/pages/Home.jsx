import { Link } from "react-router-dom";
import hostel1 from "../assets/masenopic.jpeg";
import hostel2 from "../assets/hostel2.png";
import hostel3 from "../assets/hostel3.png";
import duka1 from "../assets/keja1.jpeg";
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

      {/*filtering section by loction price and amenities*/}
      <div className="container mt-5">
        <h2 className="text-center text-success fw-bold fs-2 mb-4">Search Hostels</h2>
        <p className="text-center text-success  fs-3 mb-4">
          Use the filters below to find hostels that match your preferences.
        </p>
        <form className="row g-3 justify-content-center">
          <div className="col-md-3">
            <select className="form-select">
              <option value="">Location</option>
              <option value="maseno">Maseno</option>
              <option value="siriba">Siriba</option>
              <option value="kisumu">Kisumu</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option value="">Price Range</option>
              <option value="0-5000">0 - 5,000 KES</option>
              <option value="5001-10000">5,001 - 10,000 KES</option>
              <option value="10001-15000">10,001 - 15,000 KES</option>
              <option value="15001+">15,001+ KES</option>
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option value="">Amenities</option>
              <option value="wifi">Wi-Fi</option>
              <option value="water">Water</option>
              <option value="electricity">Electricity</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className="col-md-2 d-grid">
            <button type="submit" className="btn btn-outline-success">
              Search
            </button>
          </div>
        </form>
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

      {/*to randomly show some hostels card pictures $ description and some of services we ofer under featured hostels*/}
      <div className="container my-5">
        <h2 className="text-center text-success fw-bold fs-2 mb-4">Featured Hostels</h2>
        <div className="row">
          {/* Hostel Card 1 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={duka1} className="card-img-top" alt="Hostel 1" />
              <div className="card-body">
                <h5 className="card-title">Sunrise Hostel</h5>
                <p className="card-text">Affordable rooms with free Wi-Fi and 24/7 security.</p>
              </div>
            </div>
          </div>

          {/* Hostel Card 2 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={duka1} class="card-img-top" alt="Hostel 2" />
              <div className="card-body">
                <h5 className="card-title">Greenfield Hostel</h5>
                <p className="card-text">Comfortable rooms with reliable water and electricity.</p>
              </div>
            </div>
          </div>

          {/* Hostel Card 3 */}
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img src={duka1} className="card-img-top" alt="Hostel 3" />
              <div className="card-body">
                <h5 className="card-title">Lakeview Hostel</h5>
                <p className="card-text">Scenic views with affordable pricing and great amenities.</p>
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
