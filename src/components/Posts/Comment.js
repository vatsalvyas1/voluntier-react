import React from 'react';

const Comment = ({ comment }) => {
    return (
        <div className="bg-gray-100 p-2 rounded my-2 inline-block m-2">
            <p className="text-sm text-gray-500">{comment.userName} commented:</p>
            <p>{comment.comment}</p>
        </div>
    );
};

export default Comment;
