import { useEffect, useState } from 'react';
import './App.css';

function App() {

  useEffect(()=>{
  
    const fetchTodo = async ()=>{
      // const res = await fetch("http://localhost:9000/todo",{
      //   method: "GET"
      // })
      const res = await fetch("http://localhost:9000/todo");
      const todos = await res.json();

      setTodos(todos)
    }
    fetchTodo()

  },[])


  const [todo,setTodo] = useState("");

  const [todos,setTodos] = useState([])



  const onSubmit = async (e)=>{
    e.preventDefault();

    const res = await fetch("http://localhost:9000/todo",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        todo,
        isDone: false
      })
    });
    const newTodo = await res.json();

    setTodos((oldTodo)=>[newTodo,...oldTodo])
    setTodo('')
  }

  return (
   <div className='container'>
    <form onSubmit={onSubmit}>
      <label htmlFor='todo'>
        Todo:
      </label>
      <input name='todo' value={todo} onChange={(e)=>setTodo(e.target.value)} />  
      <button type='submit'>Add todo</button>
       </form>

       <div className='todo'>
        <ul>
          {
            todos.map(t=><li key={t._id}>{t.todo}</li>)
          }
        </ul>
       </div>
   </div>
  );
}

export default App;
