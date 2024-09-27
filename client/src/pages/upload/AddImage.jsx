import React, { useEffect, useState } from 'react'
import { FaCloudUploadAlt, FaEdit, FaRegEdit } from 'react-icons/fa'
import ImageCard from '../../components/ImageCard';
import { FiEdit2 } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addImageAsync, imageLoading } from '../../feature/imageSlice';
import toast from 'react-hot-toast';
import SingleImage from '../../components/SingleImage';

const AddImage = () => {
    const dispatch = useDispatch()
    const loading = useSelector(imageLoading)
    const [post, setPost] = useState({ title : '', description : '', image : null, imageUrl :''});
    const [error, setError] = useState({ title : '', description : '', image : '', imageUrl :'' });

    // handle post change 
    const handleChangePostData = (e)=> 
        setPost(prevPost=> ({...prevPost, [e.target?.name] : e.target.value}))


    const handleError = ()=>{
        let isError = false;
        let error = {};
        const { title, description, image } = post;
        if(!title) error.title = "image title is required!"
        if(!description) error.description = "image description is required!"
        if(!image) error.image = "Please select image to upload!"
        setError(error);
        if(!title || !description || !image) isError = true
        return isError;
    }
    
    // remove error if exist on change of post
    useEffect(()=>{
        const { title, description, image } = error;
        if(title || description || image) handleError();
    },[post])

    // handle image change 
    const handleImageChange = (e)=>{
      if(e.target.files[0]){
        let imageUrl = URL.createObjectURL(event.target.files[0]);
        setPost(prevPost=> ({...prevPost, image : e.target.files[0], imageUrl}))
      }
    }

    // handle for submit
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const isError = handleError();
        if(isError) return
        const formData = new FormData();
        Object.keys(post)?.forEach(key=>{
            formData.append(key, post[key])
        })
        const response = await dispatch(addImageAsync(formData))
        if(response?.payload?.status === "success"){
            setPost({ title : '', description : '', image : null, imageUrl : ''})
            toast.success('Image Upload Successfully')
        }else toast.error('Image is not uploaded!')
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className='flex justify-center p-4'>
            <div className='flex md:w-3/4 justify-center items-start'>
                <h3 className='text-2xl md:text-3xl font-medium p-4'>Upload Your Images</h3>
            </div>
        </div>

        <div className='flex f justify-center p-4'>
            <div className='flex flex-col w-full md:flex-row gap-4 md:gap-20 md:w-3/4 justify-center items-center md:items-start'>
                <div className={`w-full md:w-1/2 ${!post?.imageUrl && 'border border-dashed'}`}>
                    <label htmlFor='add-new-image' className='flex justify-center flex-col items-center hover:cursor-pointer relative'>
                        {post?.imageUrl? <p className='absolute right-1 z-10 top-1 text-gray text-xl text-blue-700'> <FaRegEdit /></p> 
                        :<>
                        <p className='flex justify-center text-5xl md:text-9xl'><FaCloudUploadAlt /></p>
                        <p className='flex justify-center text-sm md:text-xl text-red'> 
                            Drag & drop or click to choose files
                        </p>
                        </>
                        }
                        {error?.image && <p className='text-base font-medium f-style-i italic error'>{error?.image}</p>}
                    </label>
                    {post?.imageUrl &&<SingleImage image={post} />}
                    <input type='file' name="image" className='h-0 w-0 m-0 p-0' id="add-new-image" key={post?.imageUrl} onChange={handleImageChange}/>
                </div>

                <div className='w-full md:w-1/2'>
                    <div className='flex flex-col text-xl gap-1'>
                        <label>Title</label>
                        <input type="text"
                            placeholder="Title..." 
                            className="input input-bordered w-full" 
                            name="title"
                            value={post?.title}
                            onChange={handleChangePostData}
                        />
                        {error?.title && <p className='text-base font-medium f-style-i italic error'>{error?.title}</p>}
                    </div>

                    <div className='flex flex-col text-xl gap-1 mt-4'>
                        <label>Description</label>
                        <textarea 
                            className="textarea textarea-bordered" 
                            placeholder="Description.." 
                            name="description"
                            value={post?.description}
                            onChange={handleChangePostData}
                            rows={3}
                        >
                        </textarea>
                        {error?.description && <p className='text-base font-medium f-style-i italic error'>{error?.description}</p> }
                    </div>
                    <div className='flex flex-col text-xl gap-1 mt-4'>
                        <button type="submit" className="btn btn-error uppercase text-white" disabled={loading}>
                            Upload Image
                            {loading && <span className="loading loading-spinner text-xs text-error"></span>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </form>
  )
}

export default AddImage