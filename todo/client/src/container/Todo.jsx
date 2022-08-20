import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import TodoComp from '../components/TodoComponent';

export const Todo = () => {

  useEffect(() => {
    const fetchTodo = async () => {
      // const res = await fetch("http://localhost:9000/todo",{
      //   method: "GET"
      // })
      const res = await Axios("http://localhost:9000/todo");

      setTodos(res.data)
    }
    fetchTodo()

  }, [])

  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([])

  const onSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:9000/todo", {
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

    setTodos((oldTodo) => [newTodo, ...oldTodo])
    setTodo('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label htmlFor='todo'>
          Todo:
        </label>
        <input name='todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button type='submit'>Add todo</button>
      </form>


      <TodoComp todos={todos} />
    </div>
  )
}

