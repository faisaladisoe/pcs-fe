import {createSlice} from '@reduxjs/toolkit'

const checkInSlice = createSlice({
    name:'checkin',
    initialState:{
        isSuccess: false,
    },
    reducers:{
        checkInSuccess: (state)=>{
            state.isSuccess = true;
        },
        checkInFail: (state)=> {
            state.isSuccess = false;
        },
        reset: (state)=> {
            state.isSuccess = false;
        }
    }
});

export const { checkInSuccess, checkInFail, reset } = checkInSlice.actions;
export default checkInSlice.reducer;