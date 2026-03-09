import React from "react";
import  "./About.css";
import Evans from "../assets/Evans.jpg";
import Allan from "../assets/Allan.jpg";
import Rose from "../assets/Rose.jpg";
import Brian from "../assets/Brian.jpg";
export default function About() {
    return (
        
        <div className="about- page container py-5">

            {/*Header Section*/}
                <h1 className="text-center fw-bold mb-4"><b>About Hostel Management</b></h1>

                {/*description*/}
            <div className="text-center mb-5">
                <p className="fz-30 fw-bold text-muted">Welcome to our hostel booking system! We are dedicated to providing 
                    you with the best experience when it comes to finding and booking hostels
                    for yourself or your Student/Friend. Our platform offers a wide range of hostels around the varsity, catering
                    to different budgets and preferences.</p>
                <p className="fz-30 fw-bold text-muted">Our mission is to make Accommondation accessible and affordable for everyone. We understand that finding the 
                    right accommodation room can be a daunting task, which is why we have created
                    a user-friendly platform that allows you to easily search, compare, and book hostels that
                    suit your needs.</p>
                <p className="fz-30 fw-bold text-muted">Whether you're a solo student, a group of friends, or a family, we have options for
                    everyone. Our hostels are carefully selected to ensure they meet our
                    standards of quality, safety, and comfort. We also provide detailed
                    information about each hostel, including amenities, location, and reviews from other
                    students.
                </p>
                <p className="fts-italic text-primary text-center mb-5">
                    <p><br /></p>
                    <h4>
                        <b>
                            Safe, Affordable, and Memorable Stays Await You <br />
                            Ensuring a Seamless Booking Experience for Every Student <br />
                        </b>
                    </h4>
                </p>
            </div>
            {/*Our Team Section*/}
            <h3 className="text-center text-danger mb-5 fw-bold">Our Team Members</h3>
            <div className="row justify-content-center text-center">
                
                {/* Team Member 1 */}
                <div className="col-md-3 mb-4">
                    <div className="team-member team-card card border-0 shadow-sm p-3 h-100">
                        <img 
                            src={Evans} 
                            alt="Sir Ngeno Evans, CEO and Founder" 
                            className="rounded-circle mx-auto mb-4"
                            style={{height:"150px", widows: "150px", objectFit: "cover"}}
                        />
                        <h5 className="team-name text-danger fw-bold">Mr Ngeno Evans</h5>
                        <p className="team-title">CEO and Founder</p>
                        <p className="small text-muted">Mr. Ngeno Evans is the visionary behind our hostel booking system. With his extensive experience in the .....</p>
                        <button className="btn btn-outline-danger" src="">See More</button>

                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="team-member team-card card border-0 shadow-sm p-3 h-100">
                        <img 
                            src={Brian} 
                            alt="Sir Ngeno Evans, CEO and Founder" 
                            className="rounded-circle mx-auto mb-4"
                            style={{height:"150px", widows: "150px", objectFit: "cover"}}
                        />
                        <h5 className="team-name text-danger fw-bold">Mr. Brian Mugatsia</h5>
                        <p className="team-title">CEO and CO-Founder</p>
                        <p className="small text-muted">Mr Brian is a computer tech whose attitude is presentable and  .....</p>
                        <button className="btn btn-outline-danger" src="">See More</button>

                    </div>
                </div>

                <div className="col-md-3 mb-4">
                    <div className="team-member team-card card border-0 shadow-sm p-3 h-100">
                        <img 
                            src={Allan} 
                            alt="Sir Ngeno Evans, CEO and Founder" 
                            className="rounded-circle mx-auto mb-4"
                            style={{height:"150px", widows: "150px", objectFit: "cover"}}
                        />
                        <h5 className="team-name text-danger fw-bold">Mr. Kimaiyo Allan</h5>
                        <p className="team-title">CEO and CO-Founder</p>
                        <p className="small text-muted">Mr. Allan is a passionate and multi-talented tech guru  .....</p>
                        <button className="btn btn-outline-danger" src="">See More</button>

                    </div>
                </div>
                <div className="col-md-3 mb-4">
                    <div className="team-member team-card card border-0 shadow-sm p-3 h-100">
                        <img 
                            src={Rose}
                            alt="Sir Ngeno Evans, CEO and Founder" 
                            className="rounded-circle mx-auto mb-4"
                            style={{height:"150px", widows: "150px", objectFit: "cover"}}
                        />
                        <h5 className="team-name text-danger fw-bold">Madam Rose Sadia</h5>
                        <p className="team-title">CEO and CO-Founder</p>
                        <p className="small text-muted">Miss Rose is determine tech guru and work discipline.....</p>
                        <button className="btn btn-outline-danger" src="">See More</button>

                    </div>
                </div>

                    

                    
                    
                

                

               

                   
                
            </div>
        </div>
    );
}