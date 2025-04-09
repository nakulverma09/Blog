import React from 'react'

const Card = ({src, title}) => {
  return (
    <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition-all">
      {/* Background Image */}
      <img
        src={src}
        alt={title}
        className="w-full h-full object-cover"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text at Bottom */}
      <div className="absolute bottom-4 left-4 text-white text-xl font-bold">
        {title}
      </div>
    </div>
  )
}

export default Card