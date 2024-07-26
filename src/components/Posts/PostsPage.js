import React, { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";
import { useAuth } from "../Auth/Auth";
import Post from "./Post";
import AddPost from "./AddPost";
import joinu from "../../assests/images/joinu.png";

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isNGOUser, setIsNGOUser] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserType = async () => {
      if (currentUser) {
        const ngoDoc = await getDoc(doc(db, "NGOUsers", currentUser.uid));
        setIsNGOUser(ngoDoc.exists());
      }
    };

    fetchUserType();
  }, [currentUser]);

  useEffect(() => {
    const postsCollection = collection(db, "Posts");
    const unsubscribe = onSnapshot(postsCollection, (snapshot) => {
      const postsData = [];
      snapshot.forEach((doc) => postsData.push({ ...doc.data(), id: doc.id }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, []);

  const handleNewPostClick = () => {
    setShowAddPost(!showAddPost);
  };

  return (
    <div className="container mx-auto">
      <div className="h-96 bg-purple-200 p-4 rounded-xl">
        <div className="flex justify-between">
          <div className="mt-24">
            <h1 className="text-6xl font-extrabold mb-2 text-center">
              <span className="text-purple-800">Community</span> Posts
            </h1>
            <p className="text-2xl font-normal text-black-500 text-center">
              <span className="font-bold">Driven by Passion,</span> Fueled by
              Community: Celebrating Our Greatest Moments. Honoring the
              Champions of Change Among Us!
            </p>

            {isNGOUser && (
              <div className="text-center mt-4">
                <button
                  className="text-white bg-gradient-to-r from-violet-800 to-fuchsia-800 hover:scale-105 font-medium rounded-full text-xl px-4 py-2 transition-all duration-1000 ease-in-out"
                  onClick={handleNewPostClick}
                >
                  New Post
                </button>
              </div>
            )}
          </div>

          <div>
            <img src={joinu} alt="" className="mt-8 mr-8"></img>
          </div>
        </div>
      </div>

      {isNGOUser && showAddPost && (
        <div className="mb-6 shadow-lg mt-6">
          <AddPost />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl text-center font-semibold mt-4">
          Have <span className="text-slate-700">a Look what we done in</span>
          <span className="text-purple-800"> past:</span>
        </h1>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
