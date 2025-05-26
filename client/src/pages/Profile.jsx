import { FaCamera } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";
import { set } from "mongoose";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser ,error} = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    setFileUploadError(false);
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "real-estate");

      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dal6eoqo5/image/upload"
      );

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round(
            (event.loaded / event.total) * 100
          );
          setFilePerc(percentComplete);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setFormData((prev) => ({
            ...prev,
            avatar: response.secure_url,
          }));
          setFilePerc(100);
        } else {
          setFileUploadError(true);
          setFilePerc(0);
        }
      };

      xhr.onerror = () => {
        setFileUploadError(true);
        setFilePerc(0);
      };

      xhr.send(data);
    } catch (error) {
      setFileUploadError(true);
      setFilePerc(0);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      
      console.log('Form data being submitted:', formData);
      
      // Only include password if it's not empty
      const updateData = {
        username: formData.username,
        email: formData.email,
        avatar: formData.avatar,
        ...(formData.password && { password: formData.password }),
      };

      console.log('Update data:', updateData); // Log the data being sent to the server

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      
      
      console.log('Response from server:', data); 

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Update error:', error); 
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
  try {
    dispatch(deleteUserStart());

    const res = await fetch(`/api/user/delete/${currentUser._id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (data.success === false) {
      dispatch(deleteUserFailure(data.message));
      return;
    }

    dispatch(deleteUserSuccess(data));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <div className="relative self-center">
          <img
            onClick={() => fileRef.current.click()}
            src={
              formData.avatar ||
              currentUser?.avatar ||
              "https://cdn.vectorstock.com/i/2000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.avif"
            }
            alt="profile"
            className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          />
          <div
            className="absolute bottom-0 right-0 bg-slate-200 p-2 rounded-full cursor-pointer hover:bg-slate-300"
            onClick={() => fileRef.current.click()}
          >
            <FaCamera className="text-slate-700 text-lg" />{" "}
            {/* Changed from text-sm to text-lg */}
          </div>
        </div>
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          type="submit"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>

           {/* <p className="text-red-700 mt-5">{error ? error :""}</p> */}
        <p className="text-green-700 mt-5">{updateSuccess ?"User updated successfully!":""}</p> 
    
    </div>
  );
}
