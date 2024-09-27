import { useEffect } from "react"
import { IoMdAdd } from "react-icons/io"
import { getImagesAsync } from "../feature/imageSlice"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Toaster } from "react-hot-toast"

const Header =() =>{
  const dispatch = useDispatch()
  useEffect(()=>{
    (async()=>{
      await dispatch(getImagesAsync())
    })()
  },[])
  return (
    <>
     <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700 border-b-2 border-gray-100 sticky top-0 z-50 px-2 md:px-16 bg-white">
        <div className="flex items-center justify-between md:mx-12 p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-12 md:h-20" alt="Flowbite Logo" />
            <span className="self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">Cloud Pic</span>
          </Link>
          <Link to="upload-image" className="btn p-2 btn-error text-white text-uppercase"> <IoMdAdd /> Upload Image</Link>
        </div>
    </nav>

    <Toaster
        position="top-center"
        reverseOrder={false}
    />
    </>
   
    
  )
}

export default Header
