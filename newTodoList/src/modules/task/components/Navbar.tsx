import { useAuthStore } from "../../../store/auth/authStore";
import { useUIStore } from "../../../store/ui/uiStore";

export const Navbar = () => {
  const { logout, user } = useAuthStore();
  const openModal = useUIStore((state) => state.openModal);

  return (
    <nav className="bg-background w-full p-3 flex text-sm md:text-base justify-between items-center">
      <div className="flex gap-3 items-center">
        <img
          onClick={openModal}
          className="object-cover w-10 h-10 rounded-full cursor-pointer hover:scale-125 transition-all duration-200"
          src={user.photo}
          alt={`${user.userName} photo`}
        />
        <h4 className="text-white font-medium">{user.userName}</h4>
      </div>
      <button
        onClick={logout}
        className="border-2 border-violet-500 px-4 py-1 rounded text-white font-medium hover:bg-violet-400 hover:text-background transition-all duration-200 shadow shadow-red-300"
      >
        Sign Out
      </button>
    </nav>
  );
};
