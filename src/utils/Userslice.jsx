import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { uid: null, displayName: null, email: null, photoURL: null },
};

export const Userslice = createSlice({
  name: "users",
  initialState,
  reducers: {
    adduser: (state, action) => {
      state.value = action.payload;
    },

    removeuser: (state, action) => {
      state.value = initialState.value
    },
  },
});

export const { adduser, removeuser } = Userslice.actions;
export default Userslice.reducer;
