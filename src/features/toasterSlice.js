import { createSlice } from '@reduxjs/toolkit';



export const toasterSlice = createSlice({
  name: 'toaster',
  initialState : {
    toaster: {
      toasterStatus: false,
      toasterMessage: "",
      toasterType: "",
      timeline: "",
    }
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toastStart: (state, action) => {
      state.toaster = action.payload;
    },
    toastEnd: (state) => {
      state.toaster = {
        toasterStatus: false,
        toasterMessage: "",
        toasterType: "",
        timeline: "",
      };
    }
  },
  
});

export const { toastStart, toastEnd } = toasterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectToaster = (state) => state.toaster.toaster;



export default toasterSlice.reducer;
