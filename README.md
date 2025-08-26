# React + Redux Toolkit + TypeScript Todo App

A modern Todo application built with React, Redux Toolkit, TypeScript, and Ant Design.

## Features

- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Difficulty Levels**: Each task has a difficulty level (Easy, Medium, High)
- **Organized Sections**: Tasks are automatically organized into three sections based on difficulty
- **Inline Editing**: Edit task title and difficulty directly in the interface
- **Automatic Reorganization**: Tasks automatically move to the correct section when difficulty is changed
- **Persistent Storage**: Tasks are saved to localStorage and persist between sessions
- **Modern UI**: Built with Ant Design components and Tailwind CSS

## How It Works

### Adding Tasks

1. Enter a task title in the input field
2. Select a difficulty level (Easy, Medium, or High)
3. Click "Submit" to add the task

### Editing Tasks

1. Click the edit button (yellow pencil icon) on any task
2. An inline editor appears with:
   - Input field for the task title
   - Dropdown for selecting difficulty level
3. Make your changes
4. Click the save button (green checkmark) to save changes
5. If you change the difficulty, the task automatically moves to the correct section

### Task Actions

- **Edit**: Modify task title and difficulty
- **Complete**: Mark task as done (moves to completed section)
- **Delete**: Remove task permanently
- **Undo**: Move completed task back to active tasks

### Automatic Section Movement

When editing a task's difficulty level, the task automatically moves to the appropriate section:

- Easy tasks → Easy section
- Medium tasks → Medium section
- High tasks → High section

## Technical Stack

- **Frontend**: React 19 with TypeScript
- **State Management**: Redux Toolkit
- **UI Components**: Ant Design
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the local development URL

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── Header.tsx      # Task input and difficulty selection
│   └── Tasks.tsx       # Task display and management
├── redux/
│   ├── store.ts        # Redux store configuration
│   └── taskSlice.ts    # Task state management
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## State Management

The app uses Redux Toolkit for state management with the following structure:

- **tasks**: Array of active tasks
- **completed**: Array of completed tasks

Each task has:

- `id`: Unique identifier
- `title`: Task description
- `level`: Difficulty level ("easy" | "medium" | "high")

## Features in Detail

### Inline Editing

The inline editor provides a seamless editing experience:

- Appears in the same section where the task currently belongs
- Includes both title input and difficulty dropdown
- Maintains context during editing
- Automatically reorganizes tasks when difficulty changes

### Responsive Design

- Clean, modern interface using Ant Design components
- Responsive layout that works on different screen sizes
- Intuitive button placement and visual feedback

### Data Persistence

- All task data is automatically saved to localStorage
- Data persists between browser sessions
- No data loss when refreshing the page
