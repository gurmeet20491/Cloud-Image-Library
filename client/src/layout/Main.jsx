import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Main = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="flex justify-center w-full px-4 min-h-screen md:px-32 py-8">
      <div className="outlet-container w-full max-w-full">
        <Outlet key={location?.pathname}/>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Main
