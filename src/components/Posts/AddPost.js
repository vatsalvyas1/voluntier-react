import React, { useState, useRef } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../Firebase/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useAuth } from "../Auth/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [images, setImages] = useState([]);
  const { currentUser } = useAuth();
  const fileInputRef = useRef(null); // Create a ref for the file input

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      toast.error("Title and content are required");
      return;
    }

    let imageUrls = [];
    if (images.length > 0) {
      for (const image of images) {
        const storageRef = ref(storage, `posts/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            () => {},
            (error) => reject(error),
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                imageUrls.push(downloadURL);
                resolve();
              });
            }
          );
        });
      }
    }

    try {
      const postsRef = collection(db, "Posts");
      await addDoc(postsRef, {
        title,
        content,
        videoUrl,
        imageUrls,
        likes: 0,
        user: currentUser.uid,
        createdAt: new Date(),
      });
      setTitle("");
      setContent("");
      setVideoUrl("");
      setImages([]);
      fileInputRef.current.value = ""; // Clear the file input value
      toast.success("Post added successfully!");
    } catch (error) {
      console.error("Error adding post: ", error);
      toast.error("Failed to add post!");
    }
  };

  return (
    <div className="px-10 mx-auto py-4 bg-white rounded-xl">
      <ToastContainer />
      <h2 className="text-center text-2xl font-bold mb-4">
        Add A <span className="text-purple-800">Post :</span>
      </h2>
      <form onSubmit={handleAddPost} className="space-y-4">
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title :
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label htmlFor="desc" className="block font-medium text-gray-700">
          Description :
        </label>
        <textarea
          id="desc"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell us how the event went"
          className="w-full p-2 border border-gray-300 rounded"
          rows="4"
        ></textarea>
        <label htmlFor="vidLink" className="block font-medium text-gray-700">
          Any video of event :
        </label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Add the video link"
          className="w-full p-2 border border-gray-300 rounded"
        />
        <label htmlFor="vidLink" className="block font-medium text-gray-700">
          Add images of event :
        </label>
        <input
          type="file"
          onChange={(e) => setImages(Array.from(e.target.files))}
          className="w-full p-2 border border-gray-300 rounded"
          multiple
          ref={fileInputRef} // Attach the ref to the file input
        />
        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-sm px-5 py-2.5"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
