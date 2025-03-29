// src/screens/AddListScreen.js
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddListScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Handle the image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form to add a new todo
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled out
    if (!title || !description || !date) {
      alert('Please fill out all fields');
      return;
    }

    // Create a FormData object to send the image along with other fields
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    if (image) formData.append('image', image);

    // Send POST request to add the todo
    axios.post('http://localhost:5000/todos', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(response => {
        // Navigate back to HomeScreen after adding the todo
        navigate('/home');
      })
      .catch(error => {
        console.error('Error adding todo:', error);
        alert('Error adding todo. Please try again.');
      });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h1 className="text-center mb-4">Add New Todo</h1>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter todo title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter todo description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formDate" className="mb-3">
                  <Form.Label>Due Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formImage" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleImageChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mt-3">
                  Add Todo
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddListScreen;
