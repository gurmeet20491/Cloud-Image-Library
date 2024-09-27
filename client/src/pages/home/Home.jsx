import React from 'react'
import ImageCard from '../../components/ImageCard'
import { useSelector } from 'react-redux'
import { imageLoading, imagesList } from '../../feature/imageSlice'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'

const Home = () => {
  const loadingState = useSelector(imageLoading)

  const images = useSelector(imagesList)
  return (
    <div className='flex flex-row flex-wrap gap-8 justify-center md:justify-start'>
      {loadingState ? Array(6)?.fill()?.map((_,i)=><Loading key={i}/>) : 
     
      images?.map((image,i) => (
        <Link to={`/image/${image?._id}`} key={i}>
          <ImageCard image={image}/>
        </Link>
        ))
      }
    </div>
  )
}

export default Home