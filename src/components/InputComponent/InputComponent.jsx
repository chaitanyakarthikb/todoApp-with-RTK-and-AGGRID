import React, { useState } from "react";
import "./InputComponent.css";
import store from "../../store/store";
import { ADD_TODO } from "../../slices/TodoSlices";
import { useDispatch } from "react-redux";
const InputComponent = () => {
  const [inputValue,setInputValue] = useState("");
  const dispatch = useDispatch();
  const handleSubmitClick = ()=>{
    if(!inputValue){
      return;
    }
    // store.dispatch(ADD_TODO(inputValue))
    dispatch(ADD_TODO(inputValue))
    setInputValue("");
  }
  return (
    <div className="input">
      <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)} className="input--bar" placeholder="Enter your task" />
      <input onClick={()=>handleSubmitClick()} className="button" type="submit" value={"Add"} />
    </div>
  );
};

export default InputComponent;
