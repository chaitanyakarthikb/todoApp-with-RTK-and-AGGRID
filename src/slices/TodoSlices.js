import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

export const initialState = {
    todos:[],
    isLoading:false,
    error:null
}
export const fetchTodos = createAsyncThunk("todos/FETCH_TASKS",async(_,{rejectWithValue})=>{
    try {
        const tasks = await fetch('http://localhost:3001/todos');
        const response = await tasks.json();
        console.log("===========",response);
        return {todos:response};
    } catch (error) {
        return rejectWithValue("SOMETHING WENT WRONG!!!")
    }
})
const todoSlice = createSlice({
    name:"TodoSlice",
    initialState,
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload.todos;
                state.isLoading = false;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            })
    }
})

export const {ADD_TODO,UPDATE_TODO,DELETE_TODO,COMPLETE_TODO} = todoSlice.actions;
export default todoSlice.reducer;