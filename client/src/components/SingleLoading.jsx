import React from 'react'

const SingleLoading = () => {
  return (
    <div className='w-full flex flex-col md:flex-row gap-8  my-4 pb-8 border-b items-start'>
        <div className="w-full md:w-1/2 h-96 md:h-[700px] flex flex-col md:flex-row border shadow rounded-md bg-gray-400 animate-pulse  bg-opacity-50">
        </div>
        <div className="w-full md:w-1/2 md:p-4">
          <h2 className="w-1/2 mb-4 p-4 text-xl text-gray-300 bg-gray-400 animate-pulse rounded bg-opacity-50">Image title</h2>
          <p className="mb-4 p-8 text-gray-300 bg-gray-400 animate-pulse rounded bg-opacity-50">A cow is a domestic animal that is very common, and can be seen often.

          </p>
          <div className="flex">
              <button className="btn text-uppercase text-gray-300 bg-gray-400 animate-pulse rounded bg-opacity-50"> Free Download Now
              </button>
              <button 
                  className="btn text-uppercase ms-2 text-gray-300 bg-gray-400 animate-pulse rounded bg-opacity-50"
                 
              >
                  <span className="text-xl"></span> Delete
              </button>
          </div>
        </div>
    </div>
   
  )
}

export default SingleLoading  
