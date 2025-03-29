// src/Screen/FirstScreen.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function FirstScreen() {
  return (
    <div className="container text-center mt-5">
      <h1><b>To-Do List</b></h1><br></br>
      {/* Image added here */}
      <img
        src={process.env.PUBLIC_URL + '/istockphoto.jpg'}
        alt="To-Do List"
        className="img-fluid mb-4" // Makes the image responsive and adds margin at the bottom
        style={{ width: '40%', height: 'auto' }} // Reduces the image size to 30% of its original width while maintaining the aspect ratio
      />
      <Link to="/home"><br></br>
        <Button variant="primary">ENTER</Button>
      </Link>
    </div>
  );
}

export default FirstScreen;
