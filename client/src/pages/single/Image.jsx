import { useEffect, useState } from "react";
import ImageCard from "../../components/ImageCard"
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoDownload } from "react-icons/go";
import { imageLoading, imagesList, removeImageAsync } from "../../feature/imageSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import SingleImage from "../../components/SingleImage";
import Loading from "../../components/Loading";
import SingleLoading from "../../components/SingleLoading";

const Image = ()=>{
    const dispatch = useDispatch()
    const images = useSelector(imagesList)
    const loadingState = useSelector(imageLoading)

    const navigate = useNavigate()

    const [image, setImage] = useState(null);
    const [error, setError] = useState('');

    const {id} =  useParams()
    useEffect(()=>{
        if(id && images?.length>0){
            const image = images.find(image=> image?._id === id)
            if(!image) setError('! Image not Found')
            setImage(image)
        }
    },[id, images])

    const downloadImage = async({imageUrl, title})=>{
        try {
            const response = await fetch(imageUrl, {
                mode: 'cors',
              });
              const blob = await response.blob();
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              let name = title?.replace(/ /g, '-');
              link.download = `${name}.jpg`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
          } catch (error) {
            console.error('Image download failed:', error);
          }
    }

    // handle delete image 
    const handleDeleteImage = async (id)=>{
       const response =  await dispatch(removeImageAsync(id))
       if(response?.payload?.status === "success"){
            setImage(null)
            toast.success('Image deleted Successfully')
            navigate('/')
        }else toast.error('Image is not uploaded!')
    }
    return(
        <>
        {loadingState &&  <>
        <SingleLoading/>
        <div className='flex flex-row flex-wrap gap-8 justify-center md:justify-start'>
            {Array(6)?.fill()?.map((_,i)=><Loading key={i}/>)}
        </div>
        </>
        }
        
        {error && <p className="text-3xl font-medium text-error">{error}</p>}

        {!loadingState && image && !error && 
        <div className="flex flex-col md:flex-row gap-8  my-4 pb-8 border-b ">
            <div className="md:w-1/2 flex flex-col md:flex-row">
                <SingleImage image={image}/>
            </div>
            <div className="md:w-1/2 md:p-4">
                <h2 className="text-xl font-semibold mb-4">{image?.title}</h2>
                <p className="mb-4">{image?.description}</p>
                <div className="flex">
                    <button 
                        className="btn btn-success text-white text-uppercase"
                        onClick={()=>downloadImage(image)}
                    >
                        <GoDownload /> Free Download Now
                    </button>
                    <button 
                        className="btn btn-error text-white text-uppercase ms-2"
                        onClick={ ()=>handleDeleteImage(image?._id)}
                    >
                        <span className="text-xl"><MdDeleteOutline /></span> Delete
                    </button>
                </div>
                
            </div>
            
        </div>
        }
        
        <div className="mt-8">
            <div className='flex justify-center md:justify-start flex-wrap gap-8'>
                {images?.filter((image) => image?._id !== id)
                    .map(((image,i) => (
                        <Link to={`/image/${image?._id}`} key={i}>
                            <ImageCard width={96} height={96} image={image}/>
                        </Link>
                    )))
                }
            </div>
        </div>
        </>
    )
}

export default Image;
