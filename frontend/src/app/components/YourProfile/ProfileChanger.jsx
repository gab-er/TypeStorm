"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useState } from "react";
import ProfilePic from "../Navbar/ProfilePic";
import useAuthStore from "@/app/stores/useAuthStore";
import axios from "axios";
import url from "@/lib/apiUrl";

const ProfileChanger = () => {
  const userData = useAuthStore((state) => state.userData);
  const setUserData = useAuthStore((state) => state.setUserData);
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size > 5 * 1024 * 1024) {
      alert("Image exceeds 5mb");
      e.target.value = null;
      return;
    } else {
      setFile(file);
      return;
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post(`${url}/user/upload`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <ProfilePic
          profilePic={userData.profilePic}
          className="size-15 items-center rounded-full hover:ring-2"
        />
      </button>
      <Dialog
        open={isOpen}
        onClose={isUploading ? () => {} : () => setIsOpen(false)}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex flex-col w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 rounded-md bg-gray-800 p-12">
            {isUploading ? (
              <>
                <Description className="text-center"> uploading...</Description>
                <Description> please do not refresh the page </Description>
              </>
            ) : (
              <>
                <DialogTitle className="font-bold text-white">
                  change profile picture
                </DialogTitle>
                <input
                  className="text-gray-500 hover:text-white"
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  accept="image/*"
                />
                {file ? <img src={URL.createObjectURL(file)} /> : <></>}
                <button
                  className="text-gray-500 hover:text-white"
                  onClick={handleUpload}
                  disabled={file ? false : true}
                >
                  update
                </button>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ProfileChanger;
