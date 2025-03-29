// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import { Button,  Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the server
  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  // Handle removing a todo
  const removeTodo = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo._id !== id));
      })
      .catch(error => {
        console.error('Error removing todo:', error);
      });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">To-Do List</h1>

      {/* Add New Todo Button */}
      <Link to="/add-todo">
        <Button variant="primary" className="mb-3">Add New Todo</Button>
      </Link>

      {/* Bootstrap Grid for Todo Cards */}
      <Row>
        {todos.map((todo) => (
          <Col key={todo._id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{todo.title}</Card.Title>
                <Card.Text>{todo.description}</Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Due: {new Date(todo.date).toLocaleDateString()}</Card.Subtitle>
                
                {/* Display image if available */}
                {todo.image && (
                  <img 
                    src={`http://localhost:5000/uploads/${todo.image}`} 
                    alt="Todo" 
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} 
                  />
                )}

                {/* Remove button */}
                <Button variant="danger" className="float-end mt-3" onClick={() => removeTodo(todo._id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
