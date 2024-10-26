import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAdminLoggedIn : false,
    admin:null
};

const adminSlice = createSlice({
    name: "admin",
    initialState: initialState,
    reducers:{
        adminLogin: (state, action)=>{
            state.isAdminLoggedIn = true;
            state.admin = action.payload
        },
        adminLogout: (state) => {
            state.isAdminLoggedIn = false;
            state.admin = null;
        },
    }
});

export const {adminLogin, adminLogout} = adminSlice.actions;
export default adminSlice.reducer;