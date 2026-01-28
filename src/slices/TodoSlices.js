import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const todoSlice = createSlice({
    name:"TodoSlice",
    initialState:[],
    reducers:{
        ADD_TODO:(state,action)=>{
            state.push({
                id:nanoid(),
                task:action.payload,
                completed:false,
            })
        },
        UPDATE_TODO:(state,action)=>{
            let id = state.findIndex((el)=>el.id === action.payload.id);
            state[id].task = action.payload.newTodo;
        },
        DELETE_TODO:(state,action)=>{
            let id = state.findIndex((el)=>el.id === action.payload);
            state.splice(id,1);
        },
        COMPLETE_TODO:(state,action)=>{
            let id = state.findIndex((el)=>el.id === action.payload);
            state[id] = {
                ...state[id],
                completed:true,
            }
        }
    }
})

export const {ADD_TODO,UPDATE_TODO,DELETE_TODO,COMPLETE_TODO} = todoSlice.actions;
export default todoSlice.reducer;