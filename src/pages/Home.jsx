import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="bg-info text-white text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">
            Find Hostels Near Maseno University
          </h1>
          <p className="lead mt-3">
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
