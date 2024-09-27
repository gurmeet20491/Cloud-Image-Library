import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addImage, getImages, removeImage } from './service';

const findIndex = (id, items)=>{
    console.log('id', id)
    console.log('items', items)
    const item = items?.find(item=> item?._id === id)
    const index = items?.indexOf(item)
    return index;
}

export const getImagesAsync = createAsyncThunk(
    'get/images',
    async()=>{
        const data = await getImages()
        return data;
    }
)

export const addImageAsync = createAsyncThunk(
    'add/images',
    async(foramData)=>{
        const data = await addImage(foramData)
        return data;
    }
)

export const removeImageAsync = createAsyncThunk(
    'remove/image',
    async(id)=>{
        const data = await removeImage(id)
        return data;
    }
)

export const counterSlice = createSlice({
    name: 'image',
    initialState: {
        images : [],
        loading : false,
        error : null
    },
    extraReducers : (builder)=>{
        builder
            .addCase(getImagesAsync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(getImagesAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.images = action.payload?.images
            })  
            .addCase(getImagesAsync.rejected, state=>{
                state.loading = false
                state.error = null
            })

        // add image
        builder
            .addCase(addImageAsync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(addImageAsync.fulfilled, (state, action)=>{
                state.loading = false
                state.error = null
                state.images.push(action.payload?.image)
            })  
            .addCase(addImageAsync.rejected, state=>{
                state.loading = false
                state.error = null
            })
       
        // Remove image
        builder
            .addCase(removeImageAsync.pending, state=>{
                state.loading = true
                state.error = null
            })
            .addCase(removeImageAsync.fulfilled, (state, action)=>{  
                state.loading = false
                state.error = null
                const index = findIndex(action?.payload?.id, state?.images)
                if(index >=0)
                state.images.splice(index, 1 )
            })  
            .addCase(removeImageAsync.rejected, state=>{
                state.loading = false
                state.error = null
            })
    }
        
})

export const imagesList = state=> state?.images?.images
export const imageLoading = state=> state?.images?.loading

export default counterSlice.reducer