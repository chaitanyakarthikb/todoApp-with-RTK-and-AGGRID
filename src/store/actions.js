import { createAction } from "@reduxjs/toolkit";

export const apiCallBegan = createAction('api/callBegan');
export const addTodo = createAction('api/addTodo');
export const updateTodo = createAction('api/updateTodo');
export const deleteTodo = createAction('api/deleteTodo');
export const updateTodoCellName = createAction('api/updateTodoCellName');