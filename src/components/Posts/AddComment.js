import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';
import { useAuth } from '../Auth/Auth';

const AddComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [userName, setUserName] = useState('');
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchUserName = async () => {
            if (currentUser) {
                let userDoc;
                const volunteerDoc = await getDoc(doc(db, 'VolunteerUsers', currentUser.uid));
                if (volunteerDoc.exists()) {
                    userDoc = volunteerDoc;
                } else {
                    const ngoDoc = await getDoc(doc(db, 'NGOUsers', currentUser.uid));
                    if (ngoDoc.exists()) {
                        userDoc = ngoDoc;
                    }
                }
                if (userDoc) {
                    setUserName(userDoc.data().name);
                }
            }
        };

        fetchUserName();
    }, [currentUser]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (comment.trim() === '') return;

        try {
            const commentsRef = collection(db, 'Posts', postId, 'Comments');
            await addDoc(commentsRef, {
                comment,
                user: currentUser.uid,
                userName,
                createdAt: new Date()
            });
            setComment('');
        } catch (error) {
            console.error("Error adding comment: ", error);
        }
    };

    return (
        <form onSubmit={handleAddComment}>
            <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Add a comment..."
                rows="2"
            ></textarea>
            <button
                type="submit"
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-green-500"
            >
                Comment
            </button>
        </form>
    );
};

export default AddComment;
