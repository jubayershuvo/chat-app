import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    all_users: null,
    selected_user: null,
    isPopUpOpen:false,
    chatList:null,
    notification:null
};

const usersSlice = createSlice({
    name: "fresh_users",
    initialState: initialState,
    reducers:{
        setAllUsers: (state, action)=>{
            state.all_users = action.payload
        },
        setSelectedUser: (state, action)=>{
            state.selected_user = action.payload
        },
        setIsPopUpOpen: (state, action)=>{
            state.isPopUpOpen = action.payload
        },
        setChatsList: (state, action)=>{
            state.chatList = action.payload
        },
        setNotification: (state, action)=>{
            state.notification = [...state, action.payload]
        },
    }
});

export const {setAllUsers, setSelectedUser, setIsPopUpOpen, setChatsList, setNotification} = usersSlice.actions;
export default usersSlice.reducer;