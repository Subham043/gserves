import { createSlice } from '@reduxjs/toolkit';



export const loaderModalSlice = createSlice({
  name: 'loaderModal',
  initialState : {
    loaderModal: false,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    show: (state) => {
      state.loaderModal = true;
    },
    hide: (state) => {
      state.loaderModal = false;
    }
  },
  
});

export const { show, hide } = loaderModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectLoaderModal = (state) => state.loaderModal.loaderModal;



export default loaderModalSlice.reducer;
