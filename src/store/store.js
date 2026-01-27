import {configureStore} from '@reduxjs/toolkit';
import todosReducer from '../slices/TodoSlices.js';
const store = configureStore({
    reducer:{
        todos:todosReducer,
    }
})


export default store;