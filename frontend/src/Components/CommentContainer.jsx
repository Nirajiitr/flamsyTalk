
import React from 'react';

const CommentContainer = ({ comment }) => {
  return (
    <div className="p-2 bg-gray-100 rounded-lg mb-2">
      <p className="text-sm text-gray-800"><strong>{comment.FullName}:</strong> {comment.comment}</p>
    </div>
  );
};

export default CommentContainer;
