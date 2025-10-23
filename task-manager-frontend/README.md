# Task Manager Frontend

This project is a React + TypeScript application built with Vite. It serves as the frontend for the Task Manager application, which interacts with a Spring Boot backend.

## Features
- Task management (CRUD operations)
- Integration with a RESTful API
- Modern UI using Material-UI (MUI)
- TypeScript for type safety

## Prerequisites
- Node.js (v16 or later)
- npm (v7 or later)

## Getting Started

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/adrian1111p/task-manager-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd task-manager-frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the development server:
```bash
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173).

### Build
To create a production build:
```bash
npm run build
```

### Lint
To run the linter:
```bash
npm run lint
```

## Environment Variables
Create a `.env` file in the root directory and add the following:
```
VITE_API_BASE=http://localhost:8080/api
```

## Project Structure
- `src/` - Contains the source code
  - `api.ts` - Axios API client
  - `types.ts` - TypeScript types
  - `TaskForm.tsx` - Task form component
  - `TaskTable.tsx` - Task table component
  - `App.tsx` - Main application component

## License
This project is licensed under the MIT License.
