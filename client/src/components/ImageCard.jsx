import React from 'react'

const ImageCard = ({image}) => {
  return (
   <div className="w-96 p-4 md:p-0">
      <div className={`card card-compact bg-base-100 w-full shadow-xl rounded`}>
        <figure>
          <img
            className="h-96 max-h-96 w-full rounded"
            src={image?.imageUrl} 
            alt="Shoes" />
        </figure>
      </div>
    </div>
  )
}

export default ImageCard
