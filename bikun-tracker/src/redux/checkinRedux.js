import {createSlice} from '@reduxjs/toolkit'

const checkInSlice = createSlice({
    name:'checkin',
    initialState:{
        isSuccess: false,
        currentBus: undefined,
        isCheckout: true,
    },
    reducers:{
        checkInSuccess: (state, action)=>{
            state.isSuccess = true;
            state.currentBus = action.payload;
            state.isCheckout = false;
        },
        checkInFail: (state)=> {
            state.isSuccess = false;
            state.currentBus = '';
        },
        checkOut: (state)=> {
            state.isCheckout = true;
            state.currentBus = '';
            state.isSuccess = false;

        },
        reset: (state)=> {
            state.isSuccess = false;
        }
    }
});

export const { checkInSuccess, checkInFail, reset, checkOut} = checkInSlice.actions;
export default checkInSlice.reducer;