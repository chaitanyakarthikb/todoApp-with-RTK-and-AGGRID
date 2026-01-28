import React, { useEffect, useState } from 'react'
import './GridComponent.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import { AgGridReact } from 'ag-grid-react';
import {useDispatch, useSelector} from 'react-redux'
import { COMPLETE_TODO, DELETE_TODO, UPDATE_TODO } from '../../slices/TodoSlices';

ModuleRegistry.registerModules([AllCommunityModule]);

const GridComponent = () => {
  const dispatch = useDispatch();
  const todos = useSelector((store)=>{
    return store?.todos;
  });

  const generateRowData = (todos)=>{
    let arr = [];
     todos.map((el)=>{
      arr.push({
        ID:'*',
        Task:el?.task,
        Status:el?.completed ? "Completed" : "Pending",
        el: el
      })
     })
     setRowData(arr)
  }

  const handleCellChangeValue = (params)=>{
    console.log("================params==========",params);
    let actionObj = {
      id:params?.data?.el?.id,
      newTodo:params?.newValue,
    }
    dispatch(UPDATE_TODO(actionObj))
  }

  useEffect(()=>{
     generateRowData(todos)
  },[todos])
  const renderButtons = (params)=>{
    const el = params.data.el;
    console.log("================el",el)
    return (
      <div className='buttons'>
        <button onClick={() => dispatch(COMPLETE_TODO(el.id))}>Mark as Done</button>
        <button onClick={() => dispatch(DELETE_TODO(el.id))}>Delete</button>
      </div>
    )
  }
  const [columnDefs,setColumnDefs] = useState([{
    field:"ID",
    flex:1
  },{
    field:"Task",
    flex:2,
    editable:true,
    onCellValueChanged:(params)=>{
      handleCellChangeValue(params)
    }
  },{
    field:"Status",
    flex:1
  },{
    field:"ACTION",
    flex:1,
    cellRenderer: renderButtons
  }])
  const [rowData, setRowData] = useState([]);
  return (
    <div className='grid'>
      <AgGridReact rowData={rowData} columnDefs={columnDefs}/>

      </div>
  )
}

export default GridComponent
