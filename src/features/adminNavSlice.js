import { createSlice } from '@reduxjs/toolkit';



export const adminNavSlice = createSlice({
  name: 'adminNav',
  initialState : {
    adminNav: true,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showNav: (state) => {
      state.adminNav = !state.adminNav;
    },
    
  },
  
});

export const { showNav } = adminNavSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAdminNav = (state) => state.adminNav.adminNav;



export default adminNavSlice.reducer;
