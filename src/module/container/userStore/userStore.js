import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  user: [],
  applicationTheme: "light",
};  

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    storeUsers(aState, aUsers) {
      aState.user = aUsers.payload;
    },
    changeTheme(aState, aTheme) {
      aState.applicationTheme = aTheme.payload;
    },
    addUser(aState, aUsers) {
      aState.user = [
        ...aState.user,
        {
          id: aUsers.payload.id,
          email: aUsers.payload.email,
          first_name: aUsers.payload.firstName,
          last_name: aUsers.payload.lastName,
        },
      ];
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice.reducer;
