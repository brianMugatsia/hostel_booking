import { useState } from "react";

function ListHostel() {
  const [preview, setPreview] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type
    }));

    setPreview(previews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const newHostel = {
      id: Date.now(),
      name: form.name.value,
      location: form.location.value,
      price: form.price.value,
      description: form.description.value,
      media: preview
    };

    const stored =
      JSON.parse(localStorage.getItem("uploadedHostels")) || [];

    stored.push(newHostel);

    localStorage.setItem("uploadedHostels", JSON.stringify(stored));

    alert("Hostel listed successfully!");

    form.reset();
    setPreview([]);
  };

  return (
    <div className="container mt-4">
      <h2>List Your Hostel</h2>

      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Hostel Name" required />
        <input className="form-control mb-2" name="location" placeholder="Location" required />
        <input className="form-control mb-2" name="price" type="number" placeholder="Price (Ksh)" required />

        <textarea
          className="form-control mb-2"
          name="description"
          placeholder="Description"
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        <div className="row mb-3">
          {preview.map((item, i) => (
            <div className="col-md-3" key={i}>
              {item.type.startsWith("image") ? (
                <img src={item.url} className="img-fluid rounded" />
              ) : (
                <video src={item.url} className="img-fluid rounded" controls />
              )}
            </div>
          ))}
        </div>

        <button className="btn btn-success btn-lg">
          Submit Hostel
        </button>
      </form>
    </div>
  );
}

export default ListHostel;
