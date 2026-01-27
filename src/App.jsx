import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Hostels from "./pages/Hostels";
import HostelDetails from "./pages/HostelDetails";
import Booking from "./pages/Booking";
import ListHostel from "./pages/ListHostel"; 
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Payment from "./pages/Payment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/hostels/:id" element={<HostelDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/list-hostel" element={<ListHostel/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payment" element={<Payment/>}/>
        
      </Routes>
      <Footer/>

    </BrowserRouter>
  );
}

export default App;
