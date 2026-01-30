import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListHostel() {
  const [preview, setPreview] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // Get logged-in user
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Handle image upload (max 5)
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 5) {
      alert("You can upload a maximum of 5 photos per semester");
      return;
    }

    const previews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));

    setPreview(previews);
  };

  // Generate rooms
  const handleRoomGeneration = (e) => {
    const total = Number(e.target.value);
    if (total <= 0) return;

    const generatedRooms = Array.from({ length: total }, (_, i) => ({
      roomNumber: i + 1,
      available: true,
    }));

    setRooms(generatedRooms);
  };

  // Toggle room availability
  const toggleRoom = (index) => {
    const updatedRooms = [...rooms];
    updatedRooms[index].available = !updatedRooms[index].available;
    setRooms(updatedRooms);
  };

  // Submit hostel
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newHostel = {
      id: Date.now(),
      name: form.name.value,
      location: form.location.value,
      price: Number(form.price.value),
      description: form.description.value,
      media: preview,
      rooms: rooms,

      // ✅ OWNER INFO (VERY IMPORTANT)
      ownerEmail: currentUser.email,
      ownerRole: currentUser.role,

      createdAt: new Date().toISOString(),
    };

    const stored =
      JSON.parse(localStorage.getItem("uploadedHostels")) || [];

    stored.push(newHostel);
    localStorage.setItem("uploadedHostels", JSON.stringify(stored));

    alert("Hostel listed successfully!");

    // ✅ Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="container my-4">
      <div className="card shadow border-0">
        <div className="card-header bg-success text-white text-center">
          <h4 className="mb-0">List Your Hostel</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control mb-3"
              name="name"
              placeholder="Hostel Name"
              required
            />

            <input
              className="form-control mb-3"
              name="location"
              placeholder="Location"
              required
            />

            <input
              className="form-control mb-3"
              name="price"
              type="number"
              placeholder="Price per room (Ksh)"
              required
            />

            <textarea
              className="form-control mb-3"
              name="description"
              placeholder="Hostel description"
              rows="3"
              required
            />

            {/* Total rooms */}
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Total number of rooms"
              onChange={handleRoomGeneration}
              required
            />

            {/* Room availability */}
            {rooms.length > 0 && (
              <>
                <h6 className="mt-3">Room Availability</h6>
                <div className="row">
                  {rooms.map((room, index) => (
                    <div className="col-6 col-md-3 mb-2" key={room.roomNumber}>
                      <div className="form-check border rounded p-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={room.available}
                          onChange={() => toggleRoom(index)}
                          id={`room-${room.roomNumber}`}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`room-${room.roomNumber}`}
                        >
                          Room {room.roomNumber}{" "}
                          <span
                            className={
                              room.available
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {room.available ? "(Available)" : "(Booked)"}
                          </span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Media upload */}
            <label className="form-label mt-3">
              Upload Hostel Photos (Max 5)
            </label>
            <input
              type="file"
              className="form-control mb-3"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Preview */}
            <div className="row mb-3">
              {preview.map((item, i) => (
                <div className="col-4 col-md-3" key={i}>
                  <img
                    src={item.url}
                    className="img-fluid rounded shadow-sm"
                    alt="preview"
                  />
                </div>
              ))}
            </div>

            <button className="btn btn-success btn-lg w-100">
              Submit Hostel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListHostel;
