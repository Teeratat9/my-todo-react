import { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom"

function App() {
  const [todos, setTodos] = useState([]);
  const baseUrl = "https://668153d604acc3545a065fd8.mockapi.io/todos";
  const [isLoading,setIsLoading] = useState(true);

  const fetchTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${baseUrl}/ExampleTodoList`);
      setTodos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };
  async function deleteTodo(id){
    try{
      setIsLoading(true)
      await axios.delete(`${baseUrl}/ExampleTodoList/${id}`)
      fetchTodo()
      setIsLoading(false)
    }catch(error){
      console.log('error',error)
    }
  }
  useEffect(() => {
    fetchTodo(); 
  }, []);

  return (
    <>
    {isLoading && (<div>
      Loading....</div>)}
      {!isLoading && 
    <div>
      {todos.map((todo, index) => (
        <div key={index}>
          {todo.id} {todo.task} {todo.status}
          <Link to={`/todo/${todo.id}`}>
          <button>Edit</button>
          </Link>
          <button onClick={async () => {await deleteTodo(todo.id)}}>Delete</button>
        </div>
      ))}
    </div>
}
    </>
  );
}
export default App;
