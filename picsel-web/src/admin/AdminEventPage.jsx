import React, { useState } from "react";
import "./AdminEventPage.css";

const AdminEventPage = () => {
  // 1. Initial State with Dummy Data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "React Orientation",
      date: "2025-11-09",
      time: "10:00",
      location: "Lab 101",
      description: "Introduction to the club for new members.",
      coverImage: "https://via.placeholder.com/150", 
      gallery: [],
    },
  ]);

  // 2. Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const initialFormState = {
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    coverImage: null,
    coverPreview: "",
    gallery: [],      
    galleryPreviews: [] 
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        coverImage: file,
        coverPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleGalleryImages = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      gallery: files,
      galleryPreviews: fileUrls,
    });
  };

  const openAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      coverImage: null,
      coverPreview: event.coverImage,
      gallery: [],
      galleryPreviews: event.gallery || [],
    });
    setCurrentId(event.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(events.map((ev) => ev.id === currentId ? { ...ev, ...formData, coverImage: formData.coverPreview } : ev));
    } else {
      const newEvent = {
        id: events.length + 1,
        ...formData,
        coverImage: formData.coverPreview || "https://via.placeholder.com/150",
        gallery: formData.galleryPreviews,
      };
      setEvents([...events, newEvent]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((ev) => ev.id !== id));
    }
  };

  return (
    <div className="admin-container">
      {/* Header */}
      <div className="header-section">
        <h1>Event Management</h1>
        <button className="btn-primary" onClick={openAddModal}>
          + Add New Event
        </button>
      </div>

      {/* Table */}
      <div className="event-table-wrapper">
        <table className="event-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Date & Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>
                    <img src={event.coverImage} alt="cover" className="cover-preview"/>
                  </td>
                  <td>{event.title}</td>
                  <td>{event.date} <br /> <small style={{color:'#888'}}>{event.time}</small></td>
                  <td>{event.location}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-edit" onClick={() => openEditModal(event)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(event.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>No events found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{isEditing ? "Update Event" : "Create Event"}</h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Event Title</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleInputChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Date</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input type="time" name="time" className="form-control" value={formData.time} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-group">
                <label>Location</label>
                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} required />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea name="description" className="form-control" rows="4" value={formData.description} onChange={handleInputChange} required></textarea>
              </div>

              <div className="form-group">
                <label>Cover Image</label>
                <input type="file" accept="image/*" onChange={handleCoverImage} className="form-control" />
                {formData.coverPreview && (
                  <div className="image-preview-container">
                    <img src={formData.coverPreview} alt="Preview" className="mini-preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Gallery Images</label>
                <input type="file" accept="image/*" multiple onChange={handleGalleryImages} className="form-control" />
                <div className="image-preview-container">
                  {formData.galleryPreviews.map((src, index) => (
                    <img key={index} src={src} alt={`Gallery ${index}`} className="mini-preview" />
                  ))}
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "10px" }}>
                {isEditing ? "Update Event" : "Save Event"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventPage;