import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"TodoSlice",
    initialState:[],
    reducers:{
        ADD_TODO:(state,action)=>{
            state.push({
                id:Math.floor(Math.random()*123456789),
                task:action.payload
            })
        },
        UPDATE_TODO:(state,action)=>{
            let id = state.findIndex((el)=>el.id === action.payload.id);
            state[id].task = action.payload.task;
        },
        DELETE_TODO:(state,action)=>{
            let id = state.findIndex((el)=>el.id === action.payload.id);
            state.splice(id,1);
        }
    }
})

export const {ADD_TODO,UPDATE_TODO,DELETE_TODO} = todoSlice.actions;
export default todoSlice.reducer;