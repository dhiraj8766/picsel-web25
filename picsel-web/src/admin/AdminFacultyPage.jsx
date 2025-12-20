import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./AdminFacultyPage.css"; // Make sure to save the CSS below

const API = "http://localhost:8080/api/faculty";

const emptyForm = {
  name: "",
  role: "",
  mobile: "",
  email: "",
  message: "",
};

const AdminFacultyPage = () => {
  const [faculty, setFaculty] = useState([]);

  // Modal State
  const [showForm, setShowForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Form Data State
  const [formData, setFormData] = useState(emptyForm);
  const [profileImage, setProfileImage] = useState(null);

  // Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    loadFaculty();
  }, []);

  const loadFaculty = async () => {
    try {
      const res = await axios.get(API);
      setFaculty(res.data);
    } catch (err) {
      console.error("Error loading faculty", err);
    }
  };

  const showSuccess = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  /* ---------------- ADD / EDIT TEXT DETAILS ---------------- */

  const openAddForm = () => {
    setSelectedMember(null);
    setFormData(emptyForm);
    setProfileImage(null);
    setShowForm(true);
  };

  const openEditForm = (member) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      mobile: member.mobile,
      email: member.email,
      message: member.message,
    });
    setShowForm(true);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (selectedMember) {
        // UPDATE TEXT DETAILS (PUT) - Sends JSON as per Controller
        await axios.put(`${API}/${selectedMember.id}`, formData);
        showSuccess("Faculty details updated successfully");
      } else {
        // ADD NEW MEMBER (POST) - Sends Multipart (JSON + Image)
        const fd = new FormData();
        fd.append(
          "data",
          new Blob([JSON.stringify(formData)], {
            type: "application/json",
          })
        );
        if (profileImage) {
          fd.append("image", profileImage); // Controller expects 'image'
        }

        await axios.post(API, fd);
        showSuccess("Faculty member added successfully");
      }

      closeAll();
      loadFaculty();
    } catch (error) {
      console.error("Error saving faculty", error);
      alert("Failed to save details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- IMAGE UPDATE ONLY ---------------- */

  const openImageForm = (member) => {
    setSelectedMember(member);
    setProfileImage(null);
    setShowImageForm(true);
  };

  const submitImageForm = async (e) => {
    e.preventDefault();
    if (!profileImage) {
      alert("Please select an image first");
      return;
    }
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      // Controller expects @RequestPart("imageUrl")
      fd.append("imageUrl", profileImage);

      await axios.put(`${API}/images/${selectedMember.id}`, fd);
      showSuccess("Profile image updated successfully");

      closeAll();
      loadFaculty();
    } catch (error) {
      console.error("Error updating image", error);
      alert("Failed to update image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- UTILS ---------------- */

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this faculty member?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      showSuccess("Member deleted");
      loadFaculty();
    } catch (error) {
      console.error(error);
    }
  };

  const closeAll = () => {
    setShowForm(false);
    setShowImageForm(false);
    setProfileImage(null);
    setSelectedMember(null);
  };

  return (
    <div className="admin-page-layout">
      <AdminNav />

      <div className="admin-main-content">
        <div className="header-row">
          <h2>Manage Faculty</h2>
          <button className="btn primary" onClick={openAddForm}>
            + Add Faculty
          </button>
        </div>

        {/* FACULTY LIST */}
        <div className="item-list">
          {faculty.map((f) => (
            <div className="item-card" key={f.id}>
              {/* Image Handling: Fallback if no URL */}
              <img
                src={f.imageUrl || "https://via.placeholder.com/150"}
                alt={f.name}
                className="item-img"
              />

              <div className="item-info">
                <h4>{f.name}</h4>
                <p className="role-text">{f.role}</p>
                <small>{f.email}</small>
              </div>

              <div className="actions">
                <button onClick={() => openEditForm(f)}>Edit Info</button>
                <button onClick={() => openImageForm(f)}>Change Photo</button>
                <button className="danger" onClick={() => deleteMember(f.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT TEXT MODAL */}
        {showForm && (
          <div className="modal">
            <form className="form-box" onSubmit={submitForm}>
              <h3>{selectedMember ? "Edit Details" : "Add Faculty"}</h3>

              <input
                placeholder="Name"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                placeholder="Role (e.g. HOD, Assistant Professor)"
                value={formData.role}
                required
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />

              <input
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData({ ...formData, mobile: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <textarea
                placeholder="Message / Bio"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              {/* Only show Image Input if Adding New (POST) */}
              {!selectedMember && (
                <div className="file-input-group">
                  <label>Profile Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </div>
              )}

              <div className="form-actions">
                <button className="btn primary" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* IMAGE UPDATE MODAL */}
        {showImageForm && (
          <div className="modal">
            <form className="form-box" onSubmit={submitImageForm}>
              <h3>Update Profile Photo</h3>
              <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
                Select a new image for{" "}
                <strong>{selectedMember?.name}</strong>.
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfileImage(e.target.files[0])}
              />

              {profileImage && (
                <div className="img-preview-box">
                  <img src={URL.createObjectURL(profileImage)} alt="Preview" />
                </div>
              )}

              <div className="form-actions">
                <button className="btn primary" disabled={isSubmitting}>
                  {isSubmitting ? "Uploading..." : "Update Image"}
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>

              {isSubmitting && (
                <div className="loader-overlay">
                  <div className="spinner"></div>
                  <p>Processing...</p>
                </div>
              )}
            </form>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
};

export default AdminFacultyPage;