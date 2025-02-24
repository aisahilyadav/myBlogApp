import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  status: 'idle',
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    clearUsers: (state) => {
      state.users = [];
    }
  }
});

export const { setUsers, clearUsers } = userSlice.actions;
export default userSlice.reducer; 