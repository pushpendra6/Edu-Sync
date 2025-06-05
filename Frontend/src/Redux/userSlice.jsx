import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  role: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { name, role, token } = action.payload;
      state.name = name;
      state.role = role;
      state.token = token;
    },
    clearUser(state) {
      state.name = '';
      state.role = '';
      state.token = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
