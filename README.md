# To-Do Management
This application allows you to manage multiple todo projects, add and update todos, mark them as complete, and export project summaries as GitHub gists.

## Table of Contents
* Features
* Technologies
* Prerequisites 
* Setup 
* Running the Application 
* API Endpoints
* Exporting Project Summary to GitHub Gist

## Features

1. **Create a new project:** Organize tasks into projects.

2. **Manage todos within a project:**
   - Add new todos.
   - Edit and update existing todos.
   - Mark todos as complete.

3. **Export project summary:** Export the project summary as a GitHub gist.


## Technologies

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** [MongoDB](https://www.mongodb.com/)
- **External API:** GitHub Gist API

## Prerequisites

- **Node.js** (v16 or above)
- **npm** or **yarn**
- A **GitHub account** for exporting project summaries as gists

## Setup

### Backend (Node.js + Express)

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

3. **Install backend dependencies:**
    ```bash
    npm install
    ```

4. **Create a `.env` file in the backend directory and add the following environment variables:**
    ```bash
    PORT=5000
    MONGO_URL="mongodb://localhost:27017/todo-management"
    JWT="your_secret_key"
    ```
**Run the backend server:**
```bash
npm start



## Testing

### Backend Testing (Node.js with Jest and Supertest)
We use **Jest** for unit tests and **Supertest** for testing API endpoints.

To run tests for the backend, navigate to the backend folder and run:

```bash
cd backend
npm test
```


### Explanation:
- Each command (`cd backend`, `npm test`) is wrapped in a code block using triple backticks (` ```bash `).
- Tools like **Jest** and **Supertest** are bolded (`**`) for emphasis.
- The description clearly explains what testing frameworks are used and the commands required to execute the tests.




## Frontend (React.js)

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend```

2. Install frontend dependencies:
```bash
npm install
```

3. **Update the API endpoint** in your React project (config file) to point to the backend:

   In the configuration file (e.g., `src/config.js`), set the `Base_URL` to point to your backend:

   ```javascript
   Base_URL = "http://localhost:5000/api/v1";


## Running the Application

1. **Start the backend server:**
   ```bash
   npm star
2. **Start the frontend server:**
   ```bash
   npm start
**Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the application.


## API Endpoints

### Project Endpoints:

- **GET** `/:id`: Fetch selected project.
- **GET** `/`: Fetch all projects.
- **POST** `/`: Create a new project.
- **PUT** `/:id`: Update a project.

## Todo Endpoints:

- **POST** `/:id`: Add a new todo.
- **PATCH** `/:id`: Mark a todo as complete.
- **GET** `/:id`: Get todos within a project.
- **DELETE** `/:id`: Delete a todo.
- **PATCH** `/update/:id`: Update a todo.


## GitHub Gist Endpoints:

- **POST** `/:id`: Export project summary as a GitHub gist.

Exporting Project Summary to GitHub Gist
To export a project summary to GitHub Gist, you need to:


## Ensure you have a valid GitHub access token in your `.env` file.

Make a **POST** request to `/:id`:

The API will create a gist with the project’s details (e.g., todos and status) on your GitHub account.


