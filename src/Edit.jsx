import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import { Link } from "react-router-dom";



function Edit(){
    const {id} = useParams()
    const [todo,setTodo] = useState({
        task:''
    })
    
    const baseUrl = "https://668153d604acc3545a065fd8.mockapi.io/todos";
    
    const fetchTodo = async () => {
        try {
          const response = await axios.get(`${baseUrl}/ExampleTodoList/${id}`);
          setTodo(response.data)
        } catch (error) {
          console.log("error", error);
        }
      };

    useEffect(()=>{
        fetchTodo(id)
    },[id])

    function handleNameChange(event){
        setTodo((previousState)=>({
            ...previousState,
            task:event.target.value
        }))
    }
    async function updateTodo(){
        try{
          await axios.put(`${baseUrl}/ExampleTodoList/${todo.id}`,{
            task:todo.task
          })
          alert('update successfully')
          fetchTodo()
        }catch(error){
          console.log('error',error)
        }
      }

    return (
        <>
        <div>Todo id = {todo.id}</div>
        <div>Todo status = {todo.status}</div>
        <div>{todo.task}</div>
        <div><input type="text" value={todo.task} onChange={handleNameChange} />{todo.task}</div>
        <Link to={'/'}>
        <button>Back</button>
        </Link>
        <button onClick={updateTodo}>Edit</button>
        </>
    )
}

export default Edit