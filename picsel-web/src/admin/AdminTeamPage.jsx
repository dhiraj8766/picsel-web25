import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "./AdminNav"; // Assuming this exists based on your reference
import "./AdminTeamPage.css";

const API = "http://localhost:8080/api/team";

// The fallback link requested if checkbox is NOT checked
const DEFAULT_SOCIAL_LINK = "https://res.cloudinary.com/dawygcqzs/image/upload/v1765363439/picsel/events/gallery/m4rnilzeltodnlbysbrr.jpg";

const emptyForm = {
  name: "",
  role: "",
  mobile: "",
  email: "",
  description: "",
  tokenNo: 1, // Default to 1
  socials: {
    linkedin: "",
    instagram: "",
    twitter: ""
  }
};

// State to track if the user wants to provide a custom link (checked) or use default (unchecked)
const defaultCheckboxState = {
  linkedin: true,
  instagram: true,
  twitter: true
};

const AdminTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  
  // UI States
  const [showForm, setShowForm] = useState(false);
  const [showImageForm, setShowImageForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState("");

  // Data States
  const [formData, setFormData] = useState(emptyForm);
  const [socialChecks, setSocialChecks] = useState(defaultCheckboxState);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const res = await axios.get(API);
      setTeamMembers(res.data);
    } catch (err) {
      console.error("Error loading team", err);
    }
  };

  const showSuccess = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  /* ---------------- FORM HANDLERS ---------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSocialChange = (platform, value) => {
    setFormData({
      ...formData,
      socials: {
        ...formData.socials,
        [platform]: value
      }
    });
  };

  const handleSocialCheck = (platform, isChecked) => {
    setSocialChecks({ ...socialChecks, [platform]: isChecked });
  };

  /* ---------------- OPEN / CLOSE MODALS ---------------- */

  const openAddForm = () => {
    setSelectedMember(null);
    setFormData(emptyForm);
    setSocialChecks(defaultCheckboxState); // Reset checkboxes
    setProfileImage(null);
    setShowForm(true);
  };

  const openEditForm = (member) => {
    setSelectedMember(member);
    
    // Check if the current links match the default link to set checkbox state
    const isDefaultLink = (link) => link === DEFAULT_SOCIAL_LINK;

    setFormData({
      name: member.name,
      role: member.role,
      mobile: member.mobile,
      email: member.email,
      description: member.description,
      tokenNo: member.tokenNo,
      socials: {
        linkedin: member.socials?.linkedin || "",
        instagram: member.socials?.instagram || "",
        twitter: member.socials?.twitter || "",
      },
    });

    // Set checkboxes: Unchecked if it matches the default link, Checked otherwise
    setSocialChecks({
      linkedin: !isDefaultLink(member.socials?.linkedin),
      instagram: !isDefaultLink(member.socials?.instagram),
      twitter: !isDefaultLink(member.socials?.twitter),
    });

    setShowForm(true);
  };

  const closeAll = () => {
    setShowForm(false);
    setShowImageForm(false);
    setProfileImage(null);
    setSelectedMember(null);
  };

  /* ---------------- SUBMIT LOGIC ---------------- */

  const submitForm = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare Payload Logic
    // If checkbox is unchecked, force the DEFAULT_SOCIAL_LINK.
    // If checked, use the input value (or empty string if they typed nothing)
    const finalData = {
      ...formData,
      socials: {
        linkedin: socialChecks.linkedin ? formData.socials.linkedin : DEFAULT_SOCIAL_LINK,
        instagram: socialChecks.instagram ? formData.socials.instagram : DEFAULT_SOCIAL_LINK,
        twitter: socialChecks.twitter ? formData.socials.twitter : DEFAULT_SOCIAL_LINK,
      }
    };

    try {
      if (selectedMember) {
        // UPDATE (PUT) - JSON Body
        await axios.put(`${API}/${selectedMember.id}`, finalData);
        showSuccess("Team member updated successfully");
      } else {
        // ADD (POST) - Multipart
        const fd = new FormData();
        fd.append(
          "data",
          new Blob([JSON.stringify(finalData)], { type: "application/json" })
        );
        if (profileImage) {
          fd.append("image", profileImage);
        } else {
            alert("Image is required for new members");
            setIsSubmitting(false);
            return;
        }

        await axios.post(API, fd);
        showSuccess("Team member added successfully");
      }

      closeAll();
      loadTeam();
    } catch (error) {
      console.error("Error saving team", error);
      alert("Failed to save details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- IMAGE UPDATE ---------------- */

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
      // Controller expects 'imageUrl' key for the file in updateImage
      fd.append("imageUrl", profileImage);

      await axios.put(`${API}/images/${selectedMember.id}`, fd);
      showSuccess("Profile photo updated");

      closeAll();
      loadTeam();
    } catch (error) {
      console.error("Error updating image", error);
      alert("Failed to update image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ---------------- DELETE ---------------- */

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      showSuccess("Member deleted");
      loadTeam();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-page-layout">
      {/* Assuming AdminNav handles your navigation */}
      <AdminNav />

      <div className="admin-main-content">
        <div className="header-row">
          <h2>Manage Team</h2>
          <button className="btn primary" onClick={openAddForm}>
            + Add Member
          </button>
        </div>

        {/* TEAM LIST */}
        <div className="item-list">
          {teamMembers.map((m) => (
            <div className="item-card" key={m.id}>
              <img
                src={m.imageUrl || "https://via.placeholder.com/150"}
                alt={m.name}
                className="item-img"
              />

              <div className="item-info">
                <div className="info-top">
                  <h4>{m.name}</h4>
                  <span className="token-badge">Token: {m.tokenNo}</span>
                </div>
                <p className="role-text">{m.role}</p>
                <small>{m.email} | {m.mobile}</small>
              </div>

              <div className="actions">
                <button onClick={() => openEditForm(m)}>Edit</button>
                <button onClick={() => openImageForm(m)}>Photo</button>
                <button className="danger" onClick={() => deleteMember(m.id)}>
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
              <h3>{selectedMember ? "Edit Team Member" : "Add Team Member"}</h3>

              <div className="row-2">
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  name="role"
                  placeholder="Role (e.g. Lead)"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="row-2">
                <input
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
                <input
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-group">
                <label>Token Number:</label>
                <select 
                    name="tokenNo" 
                    value={formData.tokenNo} 
                    onChange={handleInputChange}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
              </div>

              <textarea
                name="description"
                placeholder="Description / Bio"
                rows="3"
                value={formData.description}
                onChange={handleInputChange}
              />

              {/* SOCIALS SECTION */}
              <div className="socials-section">
                <h4>Social Links</h4>
                <p className="hint">Uncheck to use default placeholder link.</p>

                {/* LinkedIn */}
                <div className="social-row">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={socialChecks.linkedin} 
                            onChange={(e) => handleSocialCheck('linkedin', e.target.checked)}
                        /> LinkedIn
                    </label>
                    {socialChecks.linkedin && (
                        <input 
                            placeholder="LinkedIn URL"
                            value={formData.socials.linkedin}
                            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                        />
                    )}
                </div>

                {/* Instagram */}
                <div className="social-row">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={socialChecks.instagram} 
                            onChange={(e) => handleSocialCheck('instagram', e.target.checked)}
                        /> Instagram
                    </label>
                    {socialChecks.instagram && (
                        <input 
                            placeholder="Instagram URL"
                            value={formData.socials.instagram}
                            onChange={(e) => handleSocialChange('instagram', e.target.value)}
                        />
                    )}
                </div>

                {/* Twitter */}
                <div className="social-row">
                    <label>
                        <input 
                            type="checkbox" 
                            checked={socialChecks.twitter} 
                            onChange={(e) => handleSocialCheck('twitter', e.target.checked)}
                        /> Twitter
                    </label>
                    {socialChecks.twitter && (
                        <input 
                            placeholder="Twitter URL"
                            value={formData.socials.twitter}
                            onChange={(e) => handleSocialChange('twitter', e.target.value)}
                        />
                    )}
                </div>
              </div>

              {/* Image Input (Only for New Members) */}
              {!selectedMember && (
                <div className="file-input-group">
                  <label>Profile Image:</label>
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={(e) => setProfileImage(e.target.files[0])}
                  />
                </div>
              )}

              <div className="form-actions">
                <button className="btn primary" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Member"}
                </button>
                <button type="button" onClick={closeAll} disabled={isSubmitting}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* IMAGE UPDATE MODAL */}
        {showImageForm && (
          <div className="modal">
            <form className="form-box small-box" onSubmit={submitImageForm}>
              <h3>Update Photo</h3>
              <p>For: <strong>{selectedMember?.name}</strong></p>

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
                  {isSubmitting ? "Uploading..." : "Upload"}
                </button>
                <button type="button" onClick={closeAll}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </div>
  );
};

export default AdminTeamPage;