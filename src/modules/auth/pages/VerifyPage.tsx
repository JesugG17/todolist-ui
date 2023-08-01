import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react';
import { userApi } from '../../../api/userApi';
import { toast } from 'react-hot-toast';
import { UserResponse } from '../../task/types/userResponse';


export const VerifyPage = () => {

    const location = useLocation();
    const { e, p } = queryString.parse(location.search);

    useEffect(() => {
      (async() => {
        const { data } = await userApi.put<UserResponse>('/reset-password', {
          email: e,
          newPassword: p
        });

        toast.success(data.message);
      })()
    }, []);

  return (
    <div className="min-h-screen bg-background flex justify-center items-center">
        <div className="w-3/5 h-2/4 bg-background-light p-6 rounded text-white flex flex-col gap-5 md:w-2/5 lg:w-1/4 xl:w-1/5 hover:scale-125 transition-all duration-200">
            <h4 className="font-bold text-center text-xl underline text-violet-500">Verify</h4>
            <p className="text-center text-xs md:text-base text-green-500 font-bold">Password succesfully restored!</p>
            <button className='bg-violet-500 p-2 text-xs rounded font-medium hover:brightness-110 transition-all duration-200 md:text-base'>
                <Link to='/auth/login'>Back to login page</Link>
            </button>
        </div>
    </div>
  )
}
