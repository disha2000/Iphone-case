import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    progress: 0     
}

const progressSlice = createSlice({
    name: 'progressSlice',
    initialState,
    reducers: {
        setUploadProgressBar:(state, action) =>{
            return {
                progress: action.payload
            }
        },
        resetUploadProgressBar:() => {
            return initialState
        }
    }
})

export const {setUploadProgressBar, resetUploadProgressBar} = progressSlice.actions;
export default progressSlice.reducer;
