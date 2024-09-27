import { configureStore } from '@reduxjs/toolkit'
import imageSlice from '../feature/imageSlice'

export default configureStore({
  reducer: {
    images : imageSlice
  },
})