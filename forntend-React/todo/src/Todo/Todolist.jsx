import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import './TodoApp.css'
import { BiEdit} from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import axios from 'axios'


function Todolist() {
    const [todos, settodos] = useState([])
    const [text, settext] = useState('')
    const [Updating, setUpdating] = useState(false)
    const [todId, settodId] = useState('')

     useEffect(() => {
       axios.get('http://localhost:8000/').then((res)=>{
        console.log(res.data);
        settodos(res.data)
       })
     }, [Updating])
     console.log(todos);
     
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const api=`http://localhost:8000/save`
        await axios.post(api,{text}).then((res)=>{
            console.log(res.data);
            settodos([...todos,res.data.toDo])
        })
    }

    const handledelete=async(id)=>{
        const api=`http://localhost:8000/deleteTodo/${id}`
        await axios.delete(api).then((res)=>{
            console.log(res.data);
            settodos(todos.filter((todo)=>todo._id !== id))
        })
    }    
    
    const handleupdate=async(item)=>{
       settext(item.text)
       settodId(item._id)
       setUpdating(true)
      
    }

    const updatetodo=async(e)=>{
        e.preventDefault()
    
        await axios.put(`http://localhost:8000/updateTodo/${todId}`,{text}).then((res)=>{
            console.log(res.data);
            settext('')
            setUpdating(false)
        })
    }
  return (
    <div>
            <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Todo App</h1>
          <Form >
            <Form.Group >
              <Form.Label>Add Todo</Form.Label>
              <Form.Control type="text" placeholder="Enter todo" value={text}  onChange={(e)=>settext(e.target.value)}  />
            </Form.Group>
            <Button variant="primary" type="submit" className="mb-3"  onClick={Updating ? updatetodo : handleSubmit} >
            {Updating ? "Update" : "Add"}
            </Button>
          </Form>
          <ListGroup className="my-4">
          {todos?.map((todo)=>(
              <ListGroup.Item key={todo._id} className=" justify-content-between align-items-center">
                {todo.text}
                <Button  size="sm" className="float-end" onClick={()=>handledelete(todo._id)}>
                    <MdDelete />
                </Button>
             <Button  size="sm" className="float-end" onClick={()=>handleupdate(todo)}>
                <BiEdit />
             </Button>
              </ListGroup.Item>
             ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>

    </div>
  )
}

export default Todolist