import { Link } from "react-router-dom"

export const Info = () => {
  return (
    <div className="absolute bg-black top-0 left-0 bg-opacity-40 text-white flex flex-col gap-3 justify-center items-center w-full h-full p-6">
        <h4 className="text-center font-bold">This option is disabled due to problems with endpoints on production...</h4>
        <button className="bg-white text-black p-2 rounded font-medium hover:brightness-90 transition-all duration-200">
            <Link to='/auth/login'>
                Back to login
            </Link>
        </button>
    </div>
  )
}
