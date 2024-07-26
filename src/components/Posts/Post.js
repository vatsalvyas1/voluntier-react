import React, { useEffect, useState } from 'react';
import { doc, collection, updateDoc, onSnapshot, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import ReactPlayer from 'react-player';
import Comment from './Comment';
import AddComment from './AddComment';
import { useAuth } from '../Auth/Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ post }) => {
    const { currentUser } = useAuth();
    const [likes, setLikes] = useState(post.likes || 0);
    const [comments, setComments] = useState([]);
    const [userHasLiked, setUserHasLiked] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    useEffect(() => {
        const postRef = doc(db, 'Posts', post.id);
        const unsubscribe = onSnapshot(postRef, (doc) => {
            if (doc.exists()) {
                const postData = doc.data();
                setLikes(postData.likes || 0);
                setUserHasLiked(postData.likedBy?.includes(currentUser?.uid));
            }
        });
        return () => unsubscribe();
    }, [post.id, currentUser]);

    const handleLike = async () => {
        if (!currentUser) {
            toast.error('User not logged in');
            return;
        }
        
        const postRef = doc(db, 'Posts', post.id);
        if (userHasLiked) {
            await updateDoc(postRef, {
                likes: likes - 1,
                likedBy: arrayRemove(currentUser.uid)
            });
        } else {
            await updateDoc(postRef, {
                likes: likes + 1,
                likedBy: arrayUnion(currentUser.uid)
            });
        }
    };

    useEffect(() => {
        const commentsRef = collection(db, 'Posts', post.id, 'Comments');
        const unsubscribe = onSnapshot(commentsRef, snapshot => {
            const commentsData = [];
            snapshot.forEach(doc => commentsData.push({ ...doc.data(), id: doc.id }));
            setComments(commentsData);
        });
        return () => unsubscribe();
    }, [post.id]);

    const getImageGridTemplate = (numImages) => {
        switch (numImages) {
            case 1:
                return '1fr';
            case 2:
                return 'repeat(2, 1fr)';
            case 3:
                return 'repeat(3, 1fr)';
            default:
                return 'repeat(2, 1fr)'; 
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <div className="flex flex-col md:flex-row items-center mb-4 border-solid border-2 rounded-xl p-2">
                {post.imageUrls && post.imageUrls.length > 0 && (
                    <div 
                        className="md:w-1/2 mb-4 md:mb-0 md:mr-4 grid gap-2" 
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: getImageGridTemplate(post.imageUrls.length) 
                        }}
                    >
                        {post.imageUrls.map((url, index) => (
                            <div key={index} className="p-1">
                                <img src={url} alt={`Post image ${index}`} className="w-full rounded-lg" />
                            </div>
                        ))}
                    </div>
                )}
                {post.videoUrl && (
                    <div className="md:w-1/2">
                        <ReactPlayer url={post.videoUrl} controls width="100%" />
                    </div>
                )}
            </div>
            <div className="flex items-center justify-center gap-3 mb-4">
                <button onClick={handleLike} className="flex items-center text-white font-bold px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-green-500 hover:">
                    {userHasLiked ? <i className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>}
                    &nbsp;Like {likes}
                </button>
                <button
                    onClick={() => setShowAddComment(!showAddComment)}
                    className="flex items-center text-white font-bold px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-green-500 "
                >
                    {showAddComment ? 'Hide Comment' : 'Add Comment'}
                </button>
            </div>
            <div className="mt-4 text-center ">
                {comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
                {showAddComment && <AddComment postId={post.id} />}
            </div>
        </div>
    );
};

export default Post;
