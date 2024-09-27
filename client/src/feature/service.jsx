import Api from "../api";

export const getImages = async()=>{
    try{
        const response =  await Api.get('/images');
        return response.data
    }catch(error){
        throw error
    }
}

export const addImage = async(foramData)=>{
    try{
        const response =  await Api.post('/images',  foramData );
        return response.data
    }catch(error){
        throw error
    }
}

export const removeImage = async(id)=>{
    try{
        const response =  await Api.delete(`/images/${id}`);
        response.id = id;
        return response.data
    }catch(error){
        throw error
    }
}

export const getImage = async(id)=>{
    try{
        const response =  await Api.get(`/images/${id}` );
        return response.data
    }catch(error){
        throw error
    }
}