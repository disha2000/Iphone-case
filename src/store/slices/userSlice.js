import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addUser: (_, action) => {
            return {
                user: action.payload
            }
        },
        removeUser: () => {
            return initialState;
        }
    }
})

export const {addUser, removeUser} = userSlice.actions;
export default userSlice.reducer;