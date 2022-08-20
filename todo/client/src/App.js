import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Container } from 'reactstrap'

// import { Todo } from './container/Todo';
// import CreateTodo from './container/createTodo';

import NotFound from './components/NotFound';

function App() {
  return (
    <Container>
      <h1>Todo</h1>
      <BrowserRouter>
        <Routes path='/todo'>
          <Route path="/" element={NotFound} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
