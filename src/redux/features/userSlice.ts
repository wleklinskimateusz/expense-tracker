import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";

const initialState: User = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.id = action.payload?.id;
      state.displayName = action.payload?.displayName;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
