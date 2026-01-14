import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

function HostelMap({ hostels }) {
  return (
    <MapContainer
      center={[-0.0035, 34.6015]} // Maseno University area
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {hostels
        .filter(h => h.lat && h.lng)
        .map(hostel => (
          <Marker key={hostel.id} position={[hostel.lat, hostel.lng]}>
            <Popup>
              <strong>{hostel.name}</strong><br />
              {hostel.location}<br />
              Ksh {hostel.price}<br />
              <Link to={`/hostels/${hostel.id}`}>
                View Details
              </Link>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}

export default HostelMap;
