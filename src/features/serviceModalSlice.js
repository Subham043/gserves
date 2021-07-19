import { createSlice } from '@reduxjs/toolkit';



export const serviceModalSlice = createSlice({
  name: 'serviceModal',
  initialState : {
    serviceModal: false,
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    showServiceModal: (state) => {
      state.serviceModal = true;
    },
    hideServiceModal: (state) => {
      state.serviceModal = false;
    }
  },
  
});

export const { showServiceModal, hideServiceModal } = serviceModalSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectServiceModal = (state) => state.serviceModal.serviceModal;



export default serviceModalSlice.reducer;
