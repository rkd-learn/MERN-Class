import { ListGroup, ListGroupItem } from "reactstrap"
const TodoComponent = (props) => {

  const todos = props.todos
  return (
    <div className="todo">
      {/* <ul style={{ */}
      {/*   color: '#fff', */}
      {/*   backgroundColor: 'rgba(0,0,0,0.5)', */}
      {/*   listStyle: 'none', */}
      {/*   padding: '10px', */}
      {/* }}> */}
      {/*   { */}
      {/* todos.map(t => <li key={t._id}>{t.todo}</li>) */}
      {/* } */}
      {/* </ul> */}

      <ListGroup className="pt-4">
        {
          todos.map(todo => <ListGroupItem key={todo._id}>{todo.todo}</ListGroupItem>)
        }
      </ListGroup>

    </div>
  )
}

export default TodoComponent
