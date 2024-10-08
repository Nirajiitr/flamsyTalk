import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../Redux/postSlice";
import axios from "axios";
import { info } from "../Redux/authSlice";


const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const { Password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [ProfilePhoto, setProfilePhoto] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 
  const dispatch = useDispatch();
  const param = useParams();
  const {authUser } = useSelector((store) => store.auth);
  const updateUser = async (id, formData) => {
    
    try {
      const token = authUser?.token;
      axios.defaults.withCredentials = true;
    
     
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/user/${id}`,
        {
          ...formData,
          currentUserId: data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    
    
      dispatch(info(response.data));
    } catch (error) {
     
      if (error.response) {
        console.error("Server responded with a status:", error.response.status);
        console.error("Error data:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Axios error:", error.message);
      }
    }
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage" ? setProfilePhoto(img) : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true); 
    let UserData = formData;
    try {
      if (ProfilePhoto) {
        const data = new FormData();
        const fileName = Date.now() + ProfilePhoto.name;
        data.append("name", fileName);
        data.append("file", ProfilePhoto);
        const uploadResult = await dispatch(uploadImage(data));
        UserData.ProfilePhoto = uploadResult.payload.url;
      }
      if (coverImage) {
        const data = new FormData();
        const fileName = Date.now() + coverImage.name;
        data.append("name", fileName);
        data.append("file", coverImage);
        const uploadCoverImage = await dispatch(uploadImage(data));
        UserData.CoverPicture = uploadCoverImage?.payload?.url;
      }
      await updateUser(param.id, UserData);
      setModalOpened(false);
    } catch (err) {
        alert("your image size is big")
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <dialog id="profile_modal" className={`modal min-w-72 ${modalOpened ? 'modal-open' : ''}`}>
      <div className=" bg-cyan-100  modal-box">
        <form className="infoForm text-black" onSubmit={handleSubmit}>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost bg-slate-200 absolute right-2 top-2"
            onClick={() => setModalOpened(false)}
          >
            ✕
          </button>
          <h3 className="font-bold text-black text-lg">Your Info</h3>
          <div>
            <input
              value={formData.about}
              onChange={handleChange}
              type="text"
              placeholder="Bio or About us"
              name="about"
              className=" input bg-sky-100 focus:outline-none input-bordered w-full mb-2"
            />
          </div>
          <div>
            <input
              value={formData.FullName}
              onChange={handleChange}
              type="text"
              placeholder="FullName"
              name="FullName"
              className=" input bg-sky-100 focus:outline-none input-bordered w-full mb-2"
            />
          </div>
          <div>
            <input
              value={formData.worksAt}
              onChange={handleChange}
              type="text"
              placeholder="Works at"
              name="worksAt"
              className=" bg-sky-100 focus:outline-none input input-bordered w-full mb-2 "
            />
          </div>
          <div>
            <input
              value={formData.LiveIn}
              onChange={handleChange}
              type="text"
              placeholder="Lives in"
              name="LiveIn"
              className=" bg-sky-100 focus:outline-none input input-bordered w-full mb-2 "
            />
            <input
              value={formData.country}
              onChange={handleChange}
              type="text"
              placeholder="Country"
              name="country"
              className=" bg-sky-100 focus:outline-none input input-bordered w-full mb-2 "
            />
          </div>
          <div>
            <input
              value={formData.Relationship}
              onChange={handleChange}
              type="text"
              className=" bg-sky-100 focus:outline-none input input-bordered w-full mb-2 "
              placeholder="Relationship status"
              name="Relationship"
            />
          </div>
          <div>
            <label className="block  text-black">Profile image</label>
            <input type="file" name="profileImage" onChange={onImageChange} className="input input-bordered w-full mb-2 items-center" />
            <label className="block  text-black">Cover image</label>
            <input type="file" name="coverImage" onChange={onImageChange} className="input input-bordered w-full mb-2" />
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={isUploading}>
            {isUploading ? "Uploading..." : "Update"}
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default ProfileModal;
