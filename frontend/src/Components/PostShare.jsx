import React, { useState, useRef } from "react";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../Redux/postSlice";
import { MdVideoCall, MdAddPhotoAlternate } from "react-icons/md";
import { FaTextWidth } from "react-icons/fa6";
import { GiCrossedSwords } from "react-icons/gi";
import defaultProfile from "../imgs/defaultProfile.png"
const PostShare = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.posts.uploading);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [postType, setPostType] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const desc = useRef();
 

  const onFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      if (postType === "imagePost") {
        setImage(file);
      } else if (postType === "videoPost") {
        setVideo(file);
      }
    }
  };

  const fileRef = useRef();

  const handleUpload = async (e) => {
    e.preventDefault();

    const newPost = {
      userId: authUser._id,
      FullName: authUser.FullName,
      ProfilePhoto: authUser?.ProfilePhoto,
      type: postType,
      desc: desc.current.value,
    };

    try {
      if ((postType === "imagePost" && image) || (postType === "videoPost" && video)) {
        const data = new FormData();
        const fileName = Date.now() + (image ? image.name : video.name);
        data.append("name", fileName);
        data.append("file", image || video);

        const uploadResult = await dispatch(uploadImage(data)).unwrap();
        
        newPost.content = uploadResult?.url;
      }

      await dispatch(uploadPost(newPost)).unwrap();
      resetShare();
    } catch (err) {
      console.error(err);
    }
  };

  const resetShare = () => {
    setImage(null);
    setVideo(null);
    desc.current.value = "";
    setPostType(null);
    setModalIsOpen(false);
  };

  return (
    <div className="flex justify-around items-center gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col w-full gap-4">
        <div className="flex justify-around">
          <div>
            <img
              src={
                authUser.ProfilePhoto
                  ? authUser.ProfilePhoto
                  : defaultProfile
              }
              alt="ProfileImage"
              className="w-20 h-20 object-cover rounded-full shadow-[var(--profileShadow)]"
            />
          </div>
          <p className="text-3xl text-[#5356FF] font-serif font-bold self-center">
            {authUser?.FullName}
          </p>
          <button
            className="btn button mt-3 text-sm font-bold text-white bg-blue-500 rounded-lg"
            onClick={() => setModalIsOpen(true)}
          >
            Create Post
          </button>
        </div>

        {postType === "imagePost" && image && (
          <div className="relative">
            <UilTimes
              className="absolute top-2 right-2 cursor-pointer text-white bg-black rounded-full size-8"
              onClick={() => setImage(null)}
            />
            <div className="w-full mt-2 max-h-80 overflow-auto">
              <img
                className="object-cover rounded-lg"
                src={URL.createObjectURL(image)}
                alt="preview"
              />
            </div>
            <input
              type="text"
              className="input text-black bg-[#EEEEEE] w-full mt-2 focus:outline-none"
              placeholder="Write caption for your post..."
              ref={desc}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-3 text-md mt-1 font-bold text-white bg-blue-500 rounded-lg disabled:opacity-50"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Uploading..." : "New Post"}
              </button>
            </div>
          </div>
        )}

        {postType === "videoPost" && video && (
          <div className="relative">
            <UilTimes
              className="absolute top-2 right-2 cursor-pointer text-white bg-black rounded-full size-8"
              onClick={() => setVideo(null)}
            />
            <div className="w-full mt-2 max-h-80 overflow-auto">
              <video
                className="object-cover rounded-lg"
                src={URL.createObjectURL(video)}
                controls
              />
            </div>
            <input
              type="text"
              className="input text-black bg-[#EEEEEE] w-full mt-2 focus:outline-none"
              placeholder="Write caption for your post..."
              ref={desc}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-3 text-md mt-1 font-bold text-white bg-blue-500 rounded-lg disabled:opacity-50"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Uploading..." : "New Post"}
              </button>
            </div>
          </div>
        )}

        {postType === "textPost" && (
          <div className="relative">
            <UilTimes
              className="absolute top-2 right-2 cursor-pointer text-white bg-black rounded-full size-8"
              onClick={() => setPostType(null)}
            />
            <textarea
              type="text"
              className=" text-black bg-[#EEEEEE] w-full overflow-auto h-40 rounded-lg p-2 focus:outline-none"
              placeholder="Write your text post..."
              ref={desc}
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-3 text-md mt-1 font-bold text-white bg-blue-500 rounded-lg disabled:opacity-50"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Uploading..." : "New Post"}
              </button>
            </div>
          </div>
        )}
      </div>

      {modalIsOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Select Post Type</h2>
              <GiCrossedSwords
                size="24px"
                onClick={() => setModalIsOpen(false)}
                className="top-0 cursor-pointer"
              />
            </div>
            <div className="flex gap-4 justify-around">
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setPostType("imagePost");
                  setModalIsOpen(false);
                  fileRef.current.click();
                }}
              >
                <MdAddPhotoAlternate size="50px" className="text-green-500" />
                <span>Image</span>
              </div>
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setPostType("videoPost");
                  setModalIsOpen(false);
                  fileRef.current.click();
                }}
              >
                <MdVideoCall size="50px" className="text-blue-500" />
                <span>Video</span>
              </div>

              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  setPostType("textPost");
                  setModalIsOpen(false);
                }}
              >
                <FaTextWidth size="50px" className="text-red-500" />
                <span>Text</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hidden">
        <input
          type="file"
          name="file"
          ref={fileRef}
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};

export default PostShare;
