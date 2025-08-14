// 🛠 Step 1: Bring in the "configureStore" tool from Redux Toolkit
// This tool creates the "store" — a big central object that holds ALL app data in one place.
import { configureStore } from "@reduxjs/toolkit";

// 🛠 Step 2: Import our "user" section of the store (userSlice is the manager for the "user" part)
import userSlice from "./userSlice";

/*
📦 The STORE:
- Think of the store as the "app's brain".
- Inside the brain, there are different "departments" (called slices) that handle different types of data.
- Example: "user" department handles user info, "cart" department handles shopping cart items, etc.

configureStore() does:
1. Create the brain (the store)
2. Put all the departments (slices) inside
3. Give the brain some built-in powers (like debugging and middleware)
*/
const store = configureStore({
  // "reducer" is like the layout of the brain
  reducer: {
    // Here, our brain has one department: "user"
    // "userSlice" is the manager in charge of keeping track of user info
    user: userSlice,
  },
});

//Types for the whole Redux setup
export type RootState = ReturnType<typeof store.getState>; // Shape of the store
export type AppDispatch = typeof store.dispatch; // Type for dispatch

// 🛠 Step 3: Export the store so the entire app can use it
// We'll give this store to React using a special <Provider> wrapper in index.js
export default store;
