import logo from './logo.svg';
import './App.css';
import InputComponent from './components/InputComponent/InputComponent';
import GridComponent from './components/GridComponent/GridComponent';
import {useDispatch} from 'react-redux'
import { addTodoSlice, ERROR_TODO, FETCH_TODOS, loadTodos, updateTodoSlice } from './slices/TodoSlices';
import { apiCallBegan } from './store/actions';
import { useEffect } from 'react';
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadTodos())
  },[]);
  return (
    <div className="App">
      <InputComponent/>
      <GridComponent/>
    </div>
  );
}

export default App;
