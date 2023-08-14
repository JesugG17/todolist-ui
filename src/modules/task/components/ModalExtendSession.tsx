import { useAuthUserStore } from "../../../store/auth/authUserStore"
import { useTasksStore } from "../../../store/task/taskStore";

export const ModalExtendSession = () => {

    const { logout, extendSession} = useAuthUserStore();
    const toggleTokenExpiredStatus = useTasksStore((state) => state.toggleTokenExpiredStatus);

  return (
    <div className="absolute bg-opacity-40 bg-black w-full h-screen flex items-center z-50">
        <div className="w-full bg-background-light text-white font-bold p-4 flex flex-col items-center gap-2">
            <h4 className="text-xl text-yellow-500 md:text-2xl">Your session has expired!</h4>
            <p className="text-xs md:text-base">Do you want to extend your session?</p>
            <div className="flex gap-5">
                <button
                    onClick={() => {
                        extendSession();
                        toggleTokenExpiredStatus();

                    }} 
                    className="text-green-500 md:text-xl border-b-2 border-b-transparent hover:border-b-white transition-all duration-200"
                >
                    Yes
                </button>
                <button
                    onClick={logout} 
                    className="text-red-500 md:text-xl border-b-2 border-b-transparent hover:border-b-white transition-all duration-200"
                >
                    No
                </button>
            </div>
        </div>
    </div>
  )
}
