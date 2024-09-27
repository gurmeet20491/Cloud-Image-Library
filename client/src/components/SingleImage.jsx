import React from 'react'

const SingleImage = ({image}) => {
  return (
    <div className={`card card-compact bg-base-100 w-fit shadow-xl rounded `}>
      <figure>
        <img
          className="w-fit max-h-[700px] rounded"
          src={image?.imageUrl} 
          alt="Shoes" />
      </figure>
    </div>
  )
}

export default SingleImage