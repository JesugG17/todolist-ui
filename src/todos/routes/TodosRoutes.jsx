import { Navigate, Route, Routes } from 'react-router';
import { TodoApp } from '../components/TodoApp';

export const TodosRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}/>
      
      <Route path="/*" element={<Navigate to='/' />} />
    </Routes>
  )
} 
