import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import todosReducer from '../slices/TodoSlices.js';
import { errorMiddleWare, middleWare } from '../middlewares/log.js';
import {logger} from 'redux-logger';
import { apiMiddleWare } from '../middlewares/api.js';
const store = configureStore({
    reducer:{
        todos:todosReducer,
    },
    middleware:(getDefaultMiddleWare)=>[...getDefaultMiddleWare(),apiMiddleWare,errorMiddleWare,logger]
})


export default store;