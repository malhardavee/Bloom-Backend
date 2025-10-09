🌿 Bloom – Backend

Welcome to the backend of Bloom — a project that turns your daily lifestyle habits into a living, growing virtual plant.
The idea is simple: when you take care of yourself, your plant thrives too 🌱

This part of the project handles all the logic behind the scenes — storing user data, calculating the plant’s state, and sending it to the frontend.

⚙️ Tech Stack

We’ve kept it simple and lightweight:
	•	Node.js + Express.js for the backend server
	•	MySQL for data storage

------------------------------------------------------------------
1. Setup MySQL database

CREATE DATABASE bloom;

USE bloom;

CREATE TABLE users (

  id INT AUTO_INCREMENT PRIMARY KEY,
  
  name VARCHAR(50),
  
  mood VARCHAR(20),
  
  diet VARCHAR(20),
  
  hydration INT,
  
  plant_state VARCHAR(20),
  
  log_date DATETIME DEFAULT CURRENT_TIMESTAMP
  
);

2. Start Server

node index.js

# Once started, the backend will run at: 

http://localhost:3000

3. API Documentation

# POST/log
Logs the user’s daily lifestyle data and returns how the virtual plant responds.

{

  "name": "Malhar",
  
  "mood": "good",
  
  "diet": "healthy",
  
  "hydration": 3
  
}

Response: 

{

  "message": "Log added successfully",
  
  "plantState": "healthy"
  
}

---------------------------------------------------------------------

# GET/status

Returns the latest lifestyle entry and the current state of the plant

Response: 

{

  "plantState": "healthy",
  
  "latestLog": {
  
  "name": "Malhar",
  
  "mood": "good",
  
  "diet": "healthy",
  
  "hydration": 3,
    
  "plant_state": "healthy",
    
  "log_date": "2025-10-09T15:20:10.000Z"

  }
}

---------------------------------------------------------------------
How to Test Using Postman

1.	Start the backend server (node index.js).

2.	Open Postman.

3.	Create a POST request to:
        http://localhost:3000/log

4. Use a GET request to: 
        http://localhost:3000/status

   to view the latest log and plant state.

---------------------------------------------------------------------
👥 Team

  •	Malhar Dave – Backend Development (Node.js + MySQL)
  
  •	Adarsh Khot – Frontend Development (UI & Interaction)

---------------------------------------------------------------------

Ideation

Bloom reflects how our habits shape our well-being — if you nurture yourself, your plant thrives; if you neglect it, it fades.

It’s a simple way to visualize balance, care, and consistency in daily life.

---------------------------------------------------------------------

About the Project

Bloom isn’t just a website, it’s a small reminder that the way we treat ourselves shows up in what we nurture.

Every log you enter is like watering your plant — small habits, big growth. 



🌻 Thank you for exploring Bloom!
