import React from 'react';
import services from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`} className='block w-full max-w-md mx-auto mb-8'>
      <div className='relative overflow-hidden bg-white rounded-xl shadow-md'>
        <img
          src={services.getFilePreview(featuredimage)}
          alt={title}
          className='object-cover w-full h-48 md:h-64 rounded-t-xl'
        />
        <div className='p-4'>
          <h2 className='text-lg md:text-xl font-bold mb-2'>{title}</h2>
          {/* Add additional content if needed */}
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
