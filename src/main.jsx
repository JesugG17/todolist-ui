import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoApp } from './components/TodoApp';
// import { Board } from './components/Board';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <TodoApp />
  // </React.StrictMode>,
)
