// import { useNavigate } from "react-router"

import { useContext } from 'react'
import { AuthContext } from '../../auth/context'

export const Header = ({ nombre }) => {

    const { logout } = useContext(AuthContext);

  return (
    <header className='titles-container mb-3'>
        <h3>TodosApp</h3>
        <div className='about'>
            <p>{ nombre }</p>
            <button
                onClick={logout} 
                className='btn btn-danger logout-button'
            >
                Logout
            </button>
        </div>
    </header>
  )
}
