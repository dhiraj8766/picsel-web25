import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav";
import "./AdminEventPage.css";

const API = "http://localhost:8080/api/events";

const emptyForm = {
  title: "",
  date: "",
  time: "",
  location: "",
  description: "",
  eventType: "type1",
};

const AdminEventPage = () => {
  const [events, setEvents] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [coverImage, setCoverImage] = useState(null);
  const [newGallery, setNewGallery] = useState([]);
  const [keptImages, setKeptImages] = useState([]);

  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const [toast, setToast] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const res = await axios.get(API);
    setEvents(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  const showSuccess = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  /* ---------------- ADD / EDIT EVENT ---------------- */

  const openAddForm = () => {
    setSelectedEvent(null);
    setFormData(emptyForm);
    setCoverImage(null);
    setNewGallery([]);
    setShowForm(true);
  };

  const openEditForm = (e) => {
    setSelectedEvent(e);
    setFormData(e);
    setShowForm(true);
  };

  const submitEventForm = async (e) => {
    e.preventDefault();
    setIsSubmittingEvent(true);

    try {
      if (selectedEvent) {
        await axios.put(`${API}/${selectedEvent.id}`, formData);
        showSuccess("Event updated successfully");
      } else {
        const fd = new FormData();
        fd.append(
          "data",
          new Blob([JSON.stringify(formData)], {
            type: "application/json",
          })
        );
        if (coverImage) fd.append("coverImage", coverImage);
        newGallery.forEach((img) => fd.append("galleryImages", img));

        await axios.post(API, fd);
        showSuccess("Event created successfully");
      }

      closeAll();
      loadEvents();
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  /* ---------------- IMAGE UPDATE ---------------- */

  const openImageForm = (e) => {
    setSelectedEvent(e);
    setKeptImages(e.gallery || []);
    setNewGallery([]);
    setCoverImage(null);
    setShowImageForm(true);
  };

  const submitImageForm = async (e) => {
    e.preventDefault();
    setIsUploadingImages(true);

    try {
      const fd = new FormData();
      if (coverImage) fd.append("coverImage", coverImage);
      newGallery.forEach((img) => fd.append("galleryImages", img));
      keptImages.forEach((url) => fd.append("keptImages", url));

      await axios.put(`${API}/images/${selectedEvent.id}`, fd);
      showSuccess("Images updated successfully");

      closeAll();
      loadEvents();
    } finally {
      setIsUploadingImages(false);
    }
  };

  const removeKeptImage = (url) => {
    setKeptImages(keptImages.filter((img) => img !== url));
  };

  const removeNewImage = (index) => {
    setNewGallery(newGallery.filter((_, i) => i !== index));
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await axios.delete(`${API}/${id}`);
    showSuccess("Event deleted");
    loadEvents();
  };

  const closeAll = () => {
    setShowForm(false);
    setShowImageForm(false);
    setCoverImage(null);
    setNewGallery([]);
    setKeptImages([]);
    setSelectedEvent(null);
  };

  return (
    <div className="admin-event-layout">
      <AdminNav />

      <div className="admin-event-main">
        <div className="header-row">
          <h2>Manage Events</h2>
          <p className="total-events">Total Events: {events.length}</p><br />
          <button className="btn primary" onClick={openAddForm}>
            + Add Event
          </button>
        </div>
        <div className="divider">
          <p className="note">Note :- Type 1 = , Type 2 = , Type 3 = ,Type 4 = ,Type 5 = ,Type 6 = ,Type 7 = .</p>
        </div>

        {/* EVENT LIST */}
        <div className="event-list">
          {events.map((e) => (
            <div className="event-card" key={e.id}>
              <img src={e.coverImage} alt="cover" className="event-cover" />

              <div className="event-info">
                <h4>{e.title}</h4>
                <p>
                  {e.date} • {e.location}
                </p>
              </div>

              <div className="actions">
                <button onClick={() => openEditForm(e)}>Edit</button>
                <button onClick={() => openImageForm(e)}>Change Images</button>
                <button className="danger" onClick={() => deleteEvent(e.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ADD / EDIT FORM */}
        {showForm && (
          <div className="modal">
            <form className="form-box" onSubmit={submitEventForm}>
              <h3>{selectedEvent ? "Edit Event" : "Add Event"}</h3>

              <input
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />

              <input
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
              />

              <input
                placeholder="Location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />

              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <select
                value={formData.eventType}
                onChange={(e) =>
                  setFormData({ ...formData, eventType: e.target.value })
                }
              >
                <option value="Sports Events">Sports Events</option>
                <option value="Technical Event">Technical Event</option>
                <option value="Esports">Esports</option>
                <option value="Cultural Events">Cultural Events</option>
                <option value="Workshops">Workshops</option>
                <option value="Guest Lectures">Guest Lectures</option>
                <option value="Fun Events">Fun Events</option>
              
              </select>

              {!selectedEvent && (
                <>
                  <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setNewGallery([...e.target.files])}
                  />
                </>
              )}

              <div className="form-actions">
                <button className="btn primary" disabled={isSubmittingEvent}>
                  {isSubmittingEvent ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  disabled={isSubmittingEvent}
                >
                  Cancel
                </button>
              </div>

              {isSubmittingEvent && (
                <div className="loader-overlay">
                  <div className="spinner"></div>
                  <p>Uploading images, please wait...</p>
                </div>
              )}
            </form>
          </div>
        )}

        {/* IMAGE UPDATE FORM */}
        {showImageForm && (
          <div className="modal">
            <form className="form-box" onSubmit={submitImageForm}>
              <h3>Update Images</h3>

              <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} />
              <input
                type="file"
                multiple
                onChange={(e) => setNewGallery([...e.target.files])}
              />

              <div className="gallery-preview">
                {keptImages.map((url) => (
                  <div className="img-box" key={url}>
                    <img src={url} alt="" />
                    <span onClick={() => removeKeptImage(url)}>×</span>
                  </div>
                ))}

                {newGallery.map((file, i) => (
                  <div className="img-box" key={i}>
                    <img src={URL.createObjectURL(file)} alt="" />
                    <span onClick={() => removeNewImage(i)}>×</span>
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button className="btn primary" disabled={isUploadingImages}>
                  {isUploadingImages ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={closeAll}
                  disabled={isUploadingImages}
                >
                  Cancel
                </button>
              </div>

              {isUploadingImages && (
                <div className="loader-overlay">
                  <div className="spinner"></div>
                  <p>Uploading images to Cloudinary...</p>
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

export default AdminEventPage;
