// A "slice" is like one department of our store's brain — it focuses on a specific piece of state.
import { createSlice } from "@reduxjs/toolkit";

/*
🧩 What createSlice() does:
1. Gives this department a name ("user")
2. Sets the starting data for this department (initialState)
3. Lists all the things this department knows how to do (reducers = functions)
*/
const userSlice = createSlice({
  // The name of this department (used for debugging and action names)
  name: "user",

  // Starting data when the app first loads
  initialState: {
    userData: null, // At first, there's no user logged in
    suggestedUsers: null, //the suggested users for that account
  },

  // "Reducers" = the actions this department can perform to change its data
  reducers: {
    /*
    🛠 setUserData:
    - This is a function that updates the "userData" in our store.
    - state = the current data for this department
    - action = the "order", telling the department what to change
    - action.payload = the actual new data we want to save
    */
    setUserData: (state, action) => {
      state.userData = action.payload; // Update the user info in the store
    },
    setSuggestedUsers: (state, action) => {
      state.suggestedUsers = action.payload;
    },
  },
});

// 🛠 Step 2: Export the actions (like "setUserData") so components can order changes
// Example: dispatch(setUserData({ name: "John" }))
export const { setUserData, setSuggestedUsers } = userSlice.actions;

// 🛠 Step 3: Export the reducer (the department manager) so the store can include it
export default userSlice.reducer;
