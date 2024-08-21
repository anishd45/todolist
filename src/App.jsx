import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import {v4 as uuidv4} from 'uuid';


export default function App() {
  const [todo, settodo]= useState("")
  const [todos, settodos]= useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(()=>{
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todo = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
  }
    
  }, [])

  const saveToLs = (params)=>{
    localStorage.setItem("todos", JSON.stringify('todos'))
  }

  const toogleFinished = (params)=>{

  }

  const handleEdit=(e, id)=>{
    let t = todos.filter(i=>i.id == id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    saveToLs()
  }

  const handleDelete=(e, id)=>{
    let newtodos = todos.filter(item=>{
      return item.id!==id
    });
    settodos(newtodos)
    saveToLs()
  }

  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(), todo, isCompleted: false}])
    settodo("")
    console.log(todos)
    saveToLs()
  }

  const handleChange=(e)=>{
    settodo(e.target.value)
  }

  const handleCheckbox = (e) =>{
    let id= e.target.name;
    let index= todos.findIndex(item=>{
      return item.id ===id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted =!newtodos[index].isCompleted;
    settodos(newtodos)
    saveToLs()
  }

  return (
    <>
    <Navbar/>
    <div className='container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
      <div className="">
        <div className="addtodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-80'/>
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-6' >Save</button>
        </div>
          <input type="checkbox" checked={showFinished} /> showFinished
        <h2 className='text-xl font-bold  '>Your Task</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item=>{
          return <div key={item.id} className="todo flex w-1/4 my-3 justify-between">
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox"value={todo.isCompleted}  id="" />
              <div className={item.isCompleted?"line-through": ""}> {item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'>Edit</button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-2'>Delete</button>
            </div>
          </div>
          })}
        </div> 
      </div>
    </div>
    </>
  );
}
