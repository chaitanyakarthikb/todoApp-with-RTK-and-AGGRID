import logo from './logo.svg';
import './App.css';
import InputComponent from './components/InputComponent/InputComponent';
import GridComponent from './components/GridComponent/GridComponent';
import {useDispatch} from 'react-redux'
function App() {
  const dispatch = useDispatch();
  // dispatch({type:"ERROR",payload:{error:"NOT FOUND"}})
  dispatch({
    type: 'API_REQUEST',
    payload: {
      apiURL: 'http://localhost:3001/todos',
      onSuccess: (data) => { console.log("=============data onSuccess", data) },
      onError: (data) => { console.log("=============data onError", data) },
    }

  })
  return (
    <div className="App">
      <InputComponent/>
      <GridComponent/>
    </div>
  );
}

export default App;
