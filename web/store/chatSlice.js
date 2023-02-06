import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    chat: [],
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setChat: (state, action) => {
            let temp = [...state.chat];
            temp.push(action.payload);
            state.chat = [...temp];
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.chat,
            };
        }
    }
});

export const { setChat } = userSlice.actions;
export const selectChat = (state) => state.chat.chat;
export default userSlice.reducer;