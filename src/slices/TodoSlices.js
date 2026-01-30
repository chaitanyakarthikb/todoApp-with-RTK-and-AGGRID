import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import { addTodo, apiCallBegan, deleteTodo, updateTodo, updateTodoCellName } from "../store/actions";

export const initialState = {
    todos:[],
    isLoading:false,
    error:null
}
// export const fetchTodos = createAsyncThunk("todos/FETCH_TASKS",async(_,{rejectWithValue})=>{
//     try {
//         const tasks = await fetch('http://localhost:3001/todos');
//         const response = await tasks.json();
//         return {todos:response};
//     } catch (error) {
        
//         return rejectWithValue("SOMETHING WENT WRONG!!!")
//     }
// })
const todoSlice = createSlice({
    name:"TodoSlice",
    initialState,
    reducers:{
        FETCH_TODOS:(state,action)=>{
            state.todos = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        ERROR_TODO:(state,action)=>{
            state.error = action.payload;
            state.isLoading = false;
        },
        LOADING_TODO:(state,action)=>{
            state.isLoading=true;
        },
        ADD_TODO:(state,action)=>{
            console.log("ADD TODO PAYLOAD",action.payload);
            state.todos=[...state.todos,action.payload];
        },
        UPDATE_TODO:(state,action)=>{
            console.log("UPDATE TODO PAYLOAD",action.payload);
            let id = state.todos.findIndex((el)=>el.id === action.payload.id);
            state.todos[id] = {...state.todos[id],task:action.payload.task,completed:action.payload.completed}
        },
        DELETE_TODO:(state,action)=>{
            state.todos = state.todos.filter(todo=>todo.id !== action.payload.id)
        }
    },
});

// ===============ACTION CREATORS==============
let apiURL = 'http://localhost:3001/todos';
export const loadTodos = () => {
    return apiCallBegan({
        apiURL: apiURL,
        onStart: LOADING_TODO.type,
        onSuccess: FETCH_TODOS.type,
        onError: ERROR_TODO.type,
    })
}

export const addTodoSlice =(task)=>{
    return addTodo({
        apiURL:apiURL,
        method:"POST",
        onStart:LOADING_TODO.type,
        data:task,
        onSuccess:ADD_TODO.type,
        onError:ERROR_TODO.type,
    })
}

export const updateTodoSlice = (id) => (dispatch, getState) => {
    const state = getState();
    const todo = state.todos.todos.find(t => t.id === id);
    if (!todo) return;
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo({
        apiURL: apiURL + `/${id}`,
        method: 'PUT',
        data: updatedTodo,
        onSuccess: UPDATE_TODO.type,
        onError: ERROR_TODO.type,
        onStart: LOADING_TODO.type,
    }));
};

export const updateTodoCellNameSlice = (actionObj)=>{
    console.log("UPDATE TODO CELL NAME ACTION OBJ",actionObj);
    return updateTodoCellName({
        apiURL:apiURL+`/${actionObj.id}`,
        method:"PUT",
        data:{id:actionObj.id,task:actionObj.newTodo,completed:actionObj.completed},
        onSuccess:UPDATE_TODO.type,
    })
}

export const deleteTodoSlice = (id)=>{
    console.log("DELETE TODO ACTION",id);
    let deleteAPIURL = apiURL+`/${id}`;
    console.log("DELETE TODO API URL",deleteAPIURL);
    return deleteTodo(
        {
            apiURL:deleteAPIURL,
            data:{id},
            method:"DELETE",
            onStart:LOADING_TODO.type,
            onSuccess:DELETE_TODO.type,
            onError:ERROR_TODO.type
        }
    )
}

export const {FETCH_TODOS,ERROR_TODO,LOADING_TODO,ADD_TODO,UPDATE_TODO,DELETE_TODO} = todoSlice.actions;

export default todoSlice.reducer;
   