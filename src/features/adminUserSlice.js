import { createSlice } from '@reduxjs/toolkit';



export const adminUserSlice = createSlice({
  name: 'adminUser',
  initialState : {
    adminUser: null,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginAdmin: (state, action) => {
      state.adminUser = action.payload;
    },
    logoutAdmin: (state) => {
      state.adminUser = null;
    }
    
  },
  
});

export const { loginAdmin, logoutAdmin } = adminUserSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAdminUser = (state) => state.adminUser.adminUser;



export default adminUserSlice.reducer;
