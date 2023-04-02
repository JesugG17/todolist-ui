import { Route, Routes } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'

export const AppRouter = () => {
  return (
    <>

        <Routes>
          <Route path='/' element={ <LoginPage /> }/>


        </Routes>

    
    </>
  )
}
